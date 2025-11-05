document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => {
            if (!response.ok) throw new Error("Помилка завантаження даних");
            return response.json();
        })
        .then(data => renderResume(data))
        .catch(error => {
            console.error(error);
            alert("Не вдалося завантажити дані з data.json");
        });
});

function renderResume(data) {
    document.getElementById("personName").textContent = `${data.firstName} ${data.lastName}`;
    document.querySelector(".subtitle").textContent = data.subtitle;

    // Контакти
    const contactList = document.querySelector(".sidebar ul.list-unstyled");
    const contactItems = contactList.querySelectorAll("li");
    if (contactItems.length >= 4) {
        contactItems[1].innerHTML = `<i class="fa-solid fa-phone me-2"></i> ${data.contacts.phone}`;
        contactItems[2].innerHTML = `<i class="fa-solid fa-globe me-2"></i> ${data.contacts.website}`;
        contactItems[3].innerHTML = `<i class="fa-solid fa-location-dot me-2"></i> ${data.contacts.location}`;
    }

    // Освіта
    const eduWrapper = document.querySelector(".education-wrapper");
    const eduHalf = eduWrapper.querySelector(".education-half-circle");
    const eduDark = eduWrapper.querySelector(".education-dark-block");
    eduHalf.innerHTML = `
    <div class="d-flex align-items-center px-3 mt-5 me-3">
      <div class="sidebar-icon-wrapper me-3 mt-5">
        <svg viewBox="0 0 512 512" fill="#000000" width="28" height="28">
          <polygon points="445.055 384.794 445.055 221.864 418.805 234.989 418.805 384.777 401.301 429.785 462.551 429.785 445.055 384.794"></polygon>
          <path d="M229.0648,306.3708l-107.7643-53.88v53.7754c0,36.2433,58.7634,65.625,131.25,65.625,72.4887,0,131.25-29.3817,131.25-65.625V252.49L276.0277,306.3741C257.5813,313.681,247.5133,313.6789,229.0648,306.3708Z"></path>
          <path d="M264.2912,282.8969l186.5207-93.26c6.4579-3.2289,6.4579-8.5107,0-11.74l-186.5207-93.26c-6.4556-3.2289-17.0214-3.2289-23.4793,0l-186.5207,93.26c-6.4556,3.2289-6.4556,8.5107,0,11.74l186.5207,93.26C247.27,286.1258,257.8356,286.1258,264.2912,282.8969Z"></path>
        </svg>
      </div>
      <h2 class="sidebar-title mb-0 mt-5">EDUCATION</h2>
    </div>
  `;

    let eduHTML = "";
    data.education.forEach(edu => {
        eduHTML += `
      <div class="sidebar-content text-white px-3 mb-3">
        <strong class="d-block content-heading">${edu.university}</strong>
        <span class="d-block content-subtext">${edu.degree}</span>
        <span class="d-block content-subtext">${edu.years}</span>
      </div>
    `;
    });
    eduDark.innerHTML = eduHTML;

    // Досвід роботи
    const jobContainer = document.querySelector(".experience-header").nextElementSibling;
    jobContainer.innerHTML = "";
    data.experience.forEach(job => {
        jobContainer.innerHTML += `
      <div class="mb-4 job-entry">
        <div class="d-flex justify-content-between">
          <div class="job-details-left">
            <strong class="job-title-text">${job.title}</strong><br>
            <span class="company-text">${job.company}</span>
          </div>
          <div class="job-time-text">${job.years}</div>
        </div>
        <p class="job-description mt-2">${job.description}</p>
      </div>
    `;
    });

    // Навички
    const skillsContainer = document.querySelector(".skills-header").nextElementSibling.querySelector(".row");
    skillsContainer.innerHTML = "";
    data.skills.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("skill-item", "mb-3");
        div.innerHTML = `
      <div class="skill-name">${skill.name}</div>
      <div class="skill-bar-container"><div class="skill-bar-fill" style="width:${skill.level}%;"></div></div>
    `;
        skillsContainer.appendChild(div);
    });

    // Мови
    const langList = document.querySelector(".language-list");
    langList.innerHTML = data.languages.map(lang => `<li class="language-item">${lang}</li>`).join("");

    // Хобі
    const hobbyList = document.querySelector(".hobbies-list");
    hobbyList.innerHTML = data.hobbies.map(hobby => `<li class="hobby-item">${hobby}</li>`).join("");

    // Референси
    const refSection = document.querySelector(".sidebar-section.dark-sidebar .sidebar-content");
    refSection.innerHTML = data.references.map(ref => `
    <strong class="d-block content-heading">${ref.name}</strong>
    <span class="d-block content-subtext">${ref.address}</span>
    <span class="d-block content-subtext">Tel: ${ref.phone}</span>
    <span class="d-block content-subtext mb-3">Email: ${ref.email}</span>
  `).join("");

    // Анімація згортання секцій
    const toggles = document.querySelectorAll(".toggle-arrow");
    toggles.forEach(arrow => {
        arrow.addEventListener("click", () => {
            const content = arrow.parentElement.nextElementSibling;
            content.classList.toggle("hidden");
            arrow.classList.toggle("rotate");
        });
    });
}

