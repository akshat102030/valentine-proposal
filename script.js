
const galleryContainer = document.getElementById('gallery-container');
const bgMusic = document.getElementById('bg-music');
const typewriterText = document.getElementById('typewriter-text');
const btnReveal = document.getElementById('btn-reveal');
const btnYes = document.getElementById('btn-yes');
const sceneCelebration = document.getElementById('scene-celebration');
const sceneProposal = document.getElementById('scene-proposal');

// Placeholder images - User should replace these
const photos = [
    'assets/images/photo1.png',
    'assets/images/photo2.png',
    'assets/images/photo3.png'
];

// Populate gallery
photos.forEach((src, index) => {
    const div = document.createElement('div');
    div.className = 'photo-card';
    div.innerHTML = `<img src="${src}" alt="Memory ${index + 1}">`;
    galleryContainer.appendChild(div);
});

function nextScene(sceneId) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
        scene.style.opacity = '0';
        scene.style.pointerEvents = 'none';
    });

    // Show target scene
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
        target.style.opacity = '1';
        target.style.pointerEvents = 'auto'; // Re-enable interaction

        // Specific logic for scenes
        if (sceneId === 'scene-memories') {
            bgMusic.play().catch(e => console.log("Audio play failed interaction required"));
        }
        if (sceneId === 'scene-declaration') {
            startTypewriter();
        }
    }
}

function startTypewriter() {
    const text = "I ❤️ You, Anshi.\nEvery moment with you feels like magic.";
    let i = 0;
    typewriterText.innerHTML = "";

    function type() {
        if (i < text.length) {
            typewriterText.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            btnReveal.style.display = 'block';
        }
    }
    type();
}

function moveNoButton() {
    const btnNo = document.getElementById('btn-no');

    // Make sure it's fixed so coordinates are relative to viewport
    btnNo.style.position = 'fixed';

    // Get random x, y within viewport but with generous padding
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 150);

    btnNo.style.left = `${Math.max(20, x)}px`;
    btnNo.style.top = `${Math.max(20, y)}px`;
}

function handleYesClick() {
    // Fire confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });

    // Transition to celebration scene
    nextScene('scene-celebration');

    // Continuous confetti
    setInterval(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
    }, 2000);
}
