console.log("Loading festivals data...");
fetch("./data/festivals.json")
  .then((res) => res.json())
  .then((data) => {
    const cardContainer = document.getElementById("festivalCards");
    const stateFilter = document.getElementById("stateFilter");
    const monthFilter = document.getElementById("monthFilter");
    const typeFilter = document.getElementById("typeFilter");

    const allStates = new Set();
    const allMonths = new Set();
    const allTypes = new Set();

    function renderCards(filteredData) {
      cardContainer.innerHTML = "";
      filteredData.forEach((festival, index) => {
        const card = document.createElement("div");
        card.className = "col-12 col-md-3 col-lg-2 mb-4";
        card.innerHTML = `
          <div class="card festival-card h-100" data-index="${index}" data-bs-toggle="modal" data-bs-target="#festivalModal">
            <img src="images/${festival.image}" class="card-img-top" alt="${festival.name}">
            <div class="card-body">
              <h5 class="card-title">${festival.name}</h5>
              <p class="card-text"><small class="text-muted">${festival.state} - ${festival.type}</small></p>
            </div>
          </div>
        `;
        cardContainer.appendChild(card);
      });

      document.querySelectorAll(".festival-card").forEach((card) => {
        card.addEventListener("click", () => {
          const index = card.getAttribute("data-index");
          showModal(filteredData[index]);
        });
      });
    }

    function showModal(festival) {
      document.getElementById("festivalModalLabel").textContent = `${festival.name} (${festival.state})`;
      document.getElementById("festivalModalBody").innerHTML = `
          <p><strong>Month:</strong> ${festival.month}</p>
          <p><strong>Type:</strong> ${festival.type}</p>
          <ul>
              ${festival.description.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <div class="text-end">
              <a href="festival-detail-template.html?id=${festival.id}" class="btn btn-primary mt-2">Know More in Detail →</a>
          </div>
      `;
  }

    function populateFilters() {
      data.forEach((festival) => {
        allStates.add(festival.state);
        allMonths.add(festival.month);
        allTypes.add(festival.type);
      });

      for (let state of allStates) {
        stateFilter.innerHTML += `<option value="${state}">${state}</option>`;
      }
      for (let month of allMonths) {
        monthFilter.innerHTML += `<option value="${month}">${month}</option>`;
      }
      for (let type of allTypes) {
        typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
      }
    }

    function applyFilters() {
      const selectedState = stateFilter.value;
      const selectedMonth = monthFilter.value;
      const selectedType = typeFilter.value;

      const filtered = data.filter(f => {
        return (
          (selectedState === "" || f.state === selectedState) &&
          (selectedMonth === "" || f.month === selectedMonth) &&
          (selectedType === "" || f.type === selectedType)
        );
      });

      renderCards(filtered);
    }

    populateFilters();
    renderCards(data);

    stateFilter.addEventListener("change", applyFilters);
    monthFilter.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
  });
