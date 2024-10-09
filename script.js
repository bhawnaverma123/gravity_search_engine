window.onload = function () {
    const elements = [document.getElementById('logo'), 
                      document.getElementById('searchInput'), 
                      document.getElementById('searchButton'), 
                      document.getElementById('iFeelLuckyButton')];
    
    // Apply gravity effect to each element
    elements.forEach(el => {
        makeFall(el);
    });
    
    function makeFall(element) {
        element.classList.add('fall');
        element.style.left = (window.innerWidth / 2 - element.offsetWidth / 2) + 'px';
        element.style.top = '100px';

        let velocity = 0;
        let gravity = 0.5; // Gravity constant
        let bounceFactor = 0.7; // Bounce effect

        function applyGravity() {
            velocity += gravity;
            let topPosition = element.offsetTop + velocity;
            
            if (topPosition + element.offsetHeight >= window.innerHeight) {
                topPosition = window.innerHeight - element.offsetHeight;
                velocity = -velocity * bounceFactor; // Bounce when hitting bottom
            }

            element.style.top = topPosition + 'px';

            requestAnimationFrame(applyGravity);
        }

        applyGravity();
    }

    // Make elements draggable by mouse (for interaction)
    elements.forEach(el => {
        el.onmousedown = function (event) {
            event.preventDefault();

            let shiftX = event.clientX - el.getBoundingClientRect().left;
            let shiftY = event.clientY - el.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                el.style.left = pageX - shiftX + 'px';
                el.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                el.onmouseup = null;
            };
        };

        el.ondragstart = function () {
            return false;
        };
    });
};
