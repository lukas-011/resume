import barba from '@barba/core';
import { gsap } from 'gsap';

barba.init({
    transitions: [
        {
            name: 'default',
            async leave({current}){
                console.log('Leave', current.namespace);
                await gsap.to(current.container, { opacity: 0, duration: 1 });
            },
            async enter({next}) {
                console.log('Enter', next.namespace)
                await gsap.to(next.container, { opacity: 1, duration: 1 });
            }
        },
    ],

    hooks: {
        // Allows us to dynamically change the stylesheet
        beforeEnter({ next }) {
            console.log("Before Enter Hook Triggered")
            // Get the link tag for the stylesheet
            const stylesheet = document.getElementById('page-stylesheet');
            if(!stylesheet) {
                console.error('Stylesheet link not found');
                return;
            }

            // Map namespaces to stylesheets
            const stylesheets = {
                'hero-page': '/src/stylesheets/HomepageStyle.css',
                'education-page': '/src/stylesheets/EducationPageStyle.css',
                'experience-page': '/src/stylesheets/ExperiencePageStyle.css',
                'contact-page': '/src/stylesheets/ContactStyle.css',
            };

            // Get the new stylesheet based on the namespace
            const newStylesheet = stylesheets[next.namespace];

            // Update the href of the link tag
            stylesheet.href = newStylesheet;
            console.log(`Stylesheet updated to: ${newStylesheet}`);
        },
    }
});

barba.hooks.beforeEnter(({ next }) => {
    console.log("Global After Enter Hook Triggered");

    // Get the link tag for the stylesheet
    const stylesheet = document.getElementById('page-stylesheet');
    if (!stylesheet) {
        console.error('Stylesheet link not found');
        return;
    }

    // Map namespaces to stylesheets
    const stylesheets = {
        'hero-page': '/src/stylesheets/HomepageStyle.css',
        'education-page': '/src/stylesheets/EducationStyle.css',
        'experience-page': '/src/stylesheets/ExperienceStyle.css',
        'contact-page': '/src/stylesheets/ContactStyle.css',
    };

    // Get the new stylesheet based on the namespace
    const newStylesheet = stylesheets[next.namespace];
    if (!newStylesheet) {
        console.error(`No stylesheet found for namespace: ${next.namespace}`);
        return;
    }

    // Update the href of the link tag
    stylesheet.href = newStylesheet;
    console.log(`Stylesheet updated to: ${newStylesheet}`);
});