import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export const usePhysicsEasterEgg = () => {
  const [isActive, setIsActive] = useState(false);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);

  const activatePhysics = () => {
    if (isActive) return;
    if (window.innerWidth <= 768) return;
    setIsActive(true);

    // Prevent scrolling once physics start
    document.body.style.overflow = 'hidden';
    document.body.classList.add('physics-active');

    // Module aliases
    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          World = Matter.World,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Create boundaries (ground, walls, ceiling) relative to the viewport
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const wallOptions = { isStatic: true, render: { visible: false } };

    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -500, width * 2, 100, wallOptions); // High ceiling to allow tossing

    World.add(world, [ground, leftWall, rightWall, ceiling]);

    // Find almost all structural and visual elements on the page for a 'Google Gravity' effect
    const allElements = document.querySelectorAll('img, p, h1, h2, h3, button, .glass-panel, .portfolio-card, .service-card, .stat-item-card, .testimonials-section, .navbar, .contact-wrapper');
    let elements = Array.from(allElements);
    
    // Filter out elements that are inside other selected elements to prevent double-physics chaos
    elements = elements.filter(el => {
      let parent = el.parentElement;
      while (parent) {
        if (elements.includes(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });

    const domBodies = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      
      // If the element is not visible or zero size, skip it
      if (rect.width === 0 || rect.height === 0) return;

      // Create a physics body matching the element's dimensions and on-screen position (viewport relative)
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        density: 0.05,
      });

      // Prepare the DOM element for absolute positioning (relative to viewport)
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.position = 'fixed';
      el.style.top = '0px';
      el.style.left = '0px';
      el.style.margin = '0px';
      el.style.zIndex = '999999';
      el.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
      el.style.cursor = 'grab';
      
      // Move element to document.body to escape any parent CSS transforms (like scroll reveals)
      document.body.appendChild(el);

      World.add(world, body);
      domBodies.push({ body, el, width: rect.width, height: rect.height });
    });

    // Disable all CSS transitions globally to prevent fighting with physics updates
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      body.physics-active * {
        transition: none !important;
        animation: none !important;
      }
    `;
    document.head.appendChild(styleTag);

    // Add mouse control
    const mouse = Mouse.create(document.body);
    // Fix mouse offset if page was scrolled, so viewport aligns with mouse
    Mouse.setOffset(mouse, { x: -window.scrollX, y: -window.scrollY });
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);

    // Keep the mouse in sync with scrolling if we were scrolled
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Sync DOM elements with Physics Engine
    Events.on(engine, 'afterUpdate', () => {
      domBodies.forEach(({ body, el, width, height }) => {
        const px = body.position.x - width / 2;
        const py = body.position.y - height / 2;
        el.style.transform = `translate(${px}px, ${py}px) rotate(${body.angle}rad)`;
      });
    });

    // Handle cursor styles on mouse interactions
    Events.on(mouseConstraint, 'mousedown', () => {
      document.body.style.cursor = 'grabbing';
      domBodies.forEach(b => b.el.style.cursor = 'grabbing');
    });
    Events.on(mouseConstraint, 'mouseup', () => {
      document.body.style.cursor = 'default';
      domBodies.forEach(b => b.el.style.cursor = 'grab');
    });

    // Run the engine
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return { activatePhysics, isActive };
};
