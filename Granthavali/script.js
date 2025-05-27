// script.js
const slokaData = [
  { name: "NavaGraha All Slokas With Adhi Prathyadhi devatas", image: "NavaGraha_All_Graha_Slokas_With_Adhi_Prathyadhi_devatas.pdf" },
  { name: "Navagraha sloka Surya and Chandra", image: "NavaGraha_Surya_Chandra_1.PNG" },
  { name: "Navagraha sloka Kuja, Budha and Guru", image: "NavaGraha_Kuja_Budha_Guru_1.PNG" },
  { name: "Navagraha sloka Shukra, Shani and Rahu", image: "NavaGraha_Shukra_Shani_Rahu_1.PNG" },
  { name: "Navagraha sloka Ketu", image: "NavaGraha_Ketu_1.PNG" },
  { name: "Pancha loka palaka sloka", image: "Pancha-loka-palaka-sloka.PNG" },
  { name: "Nandi Mukha sloka", image: "NandiMukham-Puranoktham.PNG" }
];

function renderList(filter = "") {
  const $list = $("#sloka-list");
  $list.empty();

  const filtered = slokaData.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filtered.length) {
    return $list.append(`<p class="text-center text-muted">No results found</p>`);
  }

  filtered.forEach(item => {
    const card = `
      <div class="col-12 col-sm-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm" role="button" onclick="window.open('viewer.html?file=${encodeURIComponent(item.image)}', '_blank')">
          <div class="card-body">
            <p class="card-text text-center fw-semibold">${item.name}</p>
          </div>
        </div>
      </div>
    `;
    $list.append(card);
  });
}

$("#search").on("keyup", () => renderList($("#search").val()));
$(document).ready(() => renderList());