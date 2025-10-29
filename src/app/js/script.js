document.addEventListener("DOMContentLoaded", function() {
    const fullName = "NOEL TAYLOR";
    const nameElement = document.getElementById("personName");

    if (nameElement) {
        nameElement.textContent = fullName;
    }
});

document.querySelectorAll('.toggle-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
        const content = arrow.closest('section, .col-auto')?.querySelector('.collapsible-content');
        if (content) {
            content.classList.toggle('hidden');
            arrow.classList.toggle('rotate');
        }
    });
});

const skillsCol1 = [
    { name: "Adobe Photoshop", levelPercent: 85 },
    { name: "Microsoft Word", levelPercent: 75 },
    { name: "HTML-S/CSS-3", levelPercent: 80 }
];

const skillsCol2 = [
    { name: "Adobe Illustrator", levelPercent: 70 },
    { name: "Microsoft PowerPoint", levelPercent: 65 }
];

function renderSkills(skillsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    skillsArray.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item mb-3';
        skillItem.innerHTML = `
      <div class="skill-name">${skill.name}</div>
      <div class="skill-bar-container">
        <div class="skill-bar-fill" style="width: ${skill.levelPercent}%;"></div>
      </div>
    `;
        container.appendChild(skillItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills(skillsCol1, 'skills-col-1');
    renderSkills(skillsCol2, 'skills-col-2');
});

