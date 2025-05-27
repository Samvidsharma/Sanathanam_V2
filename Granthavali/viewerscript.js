const slokaData = [
    { name: "NavaGraha All Slokas With Adhi Prathyadhi devatas", image: "NavaGraha_All_Graha_Slokas_With_Adhi_Prathyadhi_devatas.pdf" },
    { name: "Navagraha sloka Surya and Chandra", image: "NavaGraha_Surya_Chandra_1.PNG" },
    { name: "Navagraha sloka Kuja, Budha and Guru", image: "NavaGraha_Kuja_Budha_Guru_1.PNG" },
    { name: "Navagraha sloka Shukra, Shani and Rahu", image: "NavaGraha_Shukra_Shani_Rahu_1.PNG" },
    { name: "Upadevata sloka Ketu", image: "NavaGraha_Ketu_1.PNG" },
    { name: "Pancha loka palaka sloka", image: "Pancha-loka-palaka-sloka.PNG" },
    { name: "Nandi Mukha sloka", image: "NandiMukham-Puranoktham.PNG" }
];

let files = [];
let currentIndex = 0;

const $viewer = $('#viewer-container');
const $resultsDiv = $('#search-results');
const $resultsList = $('#results-list');
const $closeBtn = $('#closeSearch');
const $searchInput = $('#searchInput');
const $navButtons = $('#nav-buttons');
const $prevBtn = $('#prevBtn');
const $nextBtn = $('#nextBtn');

function renderViewer(index) {
    const file = files[index];
    if (!file) return;

    const isPDF = file.toLowerCase().endsWith(".pdf");
    if (isPDF) {
        $viewer.html(`<iframe src="./images/${file}#view=fitH" width="100%" height="600px" frameborder="0"></iframe>`);
    } else {
        $viewer.html(`<img src="./images/${file}" alt="Sloka Image" />`);
    }

    $prevBtn.prop('disabled', index === 0);
    $nextBtn.prop('disabled', index === files.length - 1);
}

function loadFile(file) {
    const isPDF = file.toLowerCase().endsWith(".pdf");
    if (isPDF) {
        $viewer.html(`<iframe src="./images/${file}#view=fitH" width="100%" height="600px" frameborder="0"></iframe>`);
    } else {
        $viewer.html(`<img src="./images/${file}" alt="Sloka Image" />`);
    }
    $navButtons.hide();
    $searchInput.val("");
}

$searchInput.on('keyup', function () {
    const query = $(this).val().trim().toLowerCase();

    $resultsList.empty();

    if (!query) {
        $resultsDiv.hide();
        return;
    }

    const filtered = slokaData.filter(item => item.name.toLowerCase().includes(query));

    if (filtered.length === 0) {
        $resultsDiv.hide();
        return;
    }

    filtered.forEach(item => {
        const $item = $('<div class="result-item"></div>').text(item.name);
        $item.on('click', () => {
            $resultsDiv.hide();
            $searchInput.val(item.name);
            loadFile(item.image);
        });
        $resultsList.append($item);
    });

    $resultsDiv.show();
});

$closeBtn.on('click', () => {
    $resultsDiv.hide();
});

$nextBtn.on('click', () => {
    if (currentIndex < files.length - 1) {
        currentIndex++;
        renderViewer(currentIndex);
    }
});

$prevBtn.on('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderViewer(currentIndex);
    }
});

// Load from URL params
const urlParams = new URLSearchParams(window.location.search);
const filesParam = urlParams.get("files") || urlParams.get("file");
files = filesParam ? filesParam.split(",") : [];

if (files.length) {
    renderViewer(currentIndex);
    if (files.length > 1) {
        $navButtons.show();
    }
} else {
    $viewer.html("<p>No file specified.</p>");
}
