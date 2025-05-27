function showFestival(name, state, month, type, description) {
    document.getElementById("festivalModalLabel").innerText = `${name} (${state})`;
    document.getElementById("festivalModalBody").innerHTML = `
      <p><strong>Month:</strong> ${month}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p>${description}</p>
    `;
  }
  const stateFilter = document.getElementById('stateFilter');
  const monthFilter = document.getElementById('monthFilter');
  const typeFilter = document.getElementById('typeFilter');
  const allCards = document.querySelectorAll('.festival-card-wrapper');
  
  function applyFilters() {
    const selectedState = stateFilter.value.toLowerCase();
    const selectedMonth = monthFilter.value.toLowerCase();
    const selectedType = typeFilter.value.toLowerCase();
  
    let visibleCount = 0;
  
    allCards.forEach(card => {
      const cardState = card.dataset.state.toLowerCase();
      const cardMonth = card.dataset.month.toLowerCase();
      const cardType = card.dataset.type.toLowerCase();
  
      const matchesState = !selectedState || cardState === selectedState;
      const matchesMonth = !selectedMonth || cardMonth === selectedMonth;
      const matchesType = !selectedType || cardType === selectedType;
  
      const shouldShow = matchesState && matchesMonth && matchesType;
      card.style.display = shouldShow ? 'block' : 'none';
  
      if (shouldShow) visibleCount++;
    });
  
    const noResultsMsg = document.getElementById('noResultsMsg');
    noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
  }
  [stateFilter, monthFilter, typeFilter].forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
  
    