document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

var sections = ['about', 'skills', 'projects', 'contact'];

document.addEventListener('scroll', e => {

    var windowHeight = window.innerHeight;
    var middle = windowHeight / 2;
    var found = false;

    for (var i = sections.length - 1; i >= 0; i--) {

        var section = sections[i];
        var sectionEl = document.getElementById(section);
        var linkEl = document.getElementById(section + '-link');

        if (!sectionEl || !linkEl) {
            continue;
        }

        if (found === true) {
            linkEl.classList.remove('is-active');
            continue;
        }

        var top = sectionEl.getBoundingClientRect().top;

        if (top < middle) {
            found = true;
        }

        linkEl.classList.toggle('is-active', top < middle);
    }
});

// const section = document.getElementById('projects');
// const realHeight = section.getBoundingClientRect().height;
// section.style.height = realHeight + "px";
// section.style.transition = "height 250ms ease-in-out";
// section.style.overflow = "hidden";
// let isOpen = true;
// document.getElementById("btn").addEventListener("click", btn => {
//     isOpen = !isOpen;
//     section.style.height = (isOpen * realHeight) + "px";
//     btn.target.innerHTML = isOpen ? "Close" : "Expand";
// });