import barba from '@barba/core';
import { gsap } from 'gsap';

const stylesheets = {
    'hero-page': '/css/HomepageStyle.css',
    'experience-page': '/css/ExperienceStyle.css',
    'contact-page': '/css/ContactStyle.css',
};

barba.init({
    sync: true,
    transitions: [
        {
            name: 'cover-transition',
            async leave({current}){
                console.log('Leave', current.namespace);

                // Grab the transition overlay that's not visible on the page
                const overlay = document.getElementById("transition-overlay");

                // Move the overlay from the left to cover the page
                await gsap.to(overlay, {
                    left: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                });

                // Fade out the current page content
                current.container.style.opacity = 0;
            },

            async enter({next}) {
                console.log('Enter', next.namespace);

                // Dynamically create and append the transition overlay if it doesn't exist
                let overlay = next.container.querySelector('transition-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'transition-overlay';
                    overlay.style.position = 'absolute';
                    overlay.style.top = '0';
                    overlay.style.left = '-100%';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.background = 'black';
                    overlay.style.zIndex = '1';
                    next.container.appendChild(overlay);
                }

                // Update the stylesheet for the new page
                const stylesheet = document.getElementById("page-stylesheet");
                const newStylesheet = stylesheets[next.namespace];

                // If the stylesheet doesn't exist then throw an error
                if (!(stylesheet && newStylesheet)) {
                     console.error("Stylesheet or namespace missing");
                }

                // Replace the current stylesheet with the new one
                stylesheet.href = newStylesheet;

                // Fade in the new page content
                next.container.style.opacity = 0;

                // Move right to reveal the page
                await gsap.to(overlay, {
                    left: "100%",
                    duration: 0.8,
                    ease: "power2.inOut",
                });

                // Reset the overlay position
                gsap.set(overlay, { left: "-100% "});
                gsap.to(next.container, { opacity: 1, duration: 0.3 });
            }
        },
    ]
});