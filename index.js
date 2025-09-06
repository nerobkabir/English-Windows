const text = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((value) => value.json())
        .then((json) => display(json.data))
}

const display_btn = () => {
    const value = document.querySelectorAll(".lesson-btn")
    for (const val of value) {
        val.classList.remove("active")
    }
}

const push_button = (value) => {
    const find_lavel = `https://openapi.programming-hero.com/api/level/${value}`
    fetch(find_lavel)
        .then((rec) => rec.json())
        .then((data) => {
            display_btn();
            const find_btn = document.getElementById(`lesson-btn${value}`)
            find_btn.classList.add("active")

            display_lavel(data.data)
        })

}

// label information

const lavel_info = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const value = await fetch(url)
    const details = await value.json();
    display_info(details.data);
}

const display_info = (word) => {
  const value = document.getElementById("modal-info");
  value.innerHTML = `
    <div class="bg-white w-96 md:w-[450px] rounded-2xl shadow-lg p-6">
      <!-- Word Title -->
      <h2 class="text-xl font-bold text-gray-800 mb-3">
        ${word.word} <span class="text-gray-600">
          (<i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation})
        </span>
      </h2>

      <!-- Meaning -->
      <div class="mb-4">
        <p class="font-semibold text-gray-700">Meaning</p>
        <p class="text-gray-600">${word.meaning}</p>
      </div>

      <!-- Example -->
      <div class="mb-4">
        <p class="font-semibold text-gray-700">Example</p>
        <p class="text-gray-600">${word.example || "No example found."}</p>
      </div>

      <!-- Synonyms -->
      <div class="mb-5">
        <p class="font-semibold text-gray-700 mb-2">সমার্থক শব্দ গুলো</p>
        <div class="flex gap-2 flex-wrap">
          ${(word.synonyms || ["N/A"]).map(s => 
            `<span class="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 border">${s}</span>`
          ).join("")}
        </div>
      </div>

      <!-- Close Button -->
      <form method="dialog">
        <button class="btn bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">Close</button>
      </form>
    </div>
  `;

  // modal open
  document.getElementById("my_modal_5").showModal();
};


const display_lavel = (data) => {
    const find_data = document.getElementById("word-contant");
    find_data.innerHTML = "";

    if (data.length == 0) {
        find_data.innerHTML = `
            <div  class="text-center bg-sky-100 col-span-full py-8 rounded-xl font-bangla">
                <img class="mx-auto" src="./images/alert-error.png" alt="">
                <p class="py-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bold text-3xl">নেক্সট Lesson এ যান</h1>
            </div>
        `
        return
    }

    for (const datas of data) {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="bg-white rounded-xl text-center py-12 px-5 space-y-4">
                <h1 class="font-bold text-2xl">${datas.word ? datas.word : "Word Not found"}</h1>
                <p class="font-semibold">Meaning /Pronunciation</p>
                <h1 class="font-bold text-2xl font-bangla">${datas.meaning ? datas.meaning : "Meaning Not Found"} / ${datas.pronunciation ? datas.pronunciation : "Pronunciation Not Found"}</h1>

                <div class="flex justify-between items-center">
                    <button onclick="lavel_info(${data.datas})"><i class="fa-solid fa-circle-info"></i></button>
                    <button><i class="fa-solid fa-volume-high"></i></button>

                </div>
            </div>
        `
        find_data.append(div);
    }
}

const display = (lesson) => {
    const find_container = document.getElementById("lavel-container");
    find_container.innerHTML = "";

    for (const less of lesson) {
        const div = document.createElement("div")
        div.innerHTML = `
            <button
            id="lesson-btn${less.level_no}"
            onclick= "push_button(${less.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book"></i> Learn - ${less.level_no}
            </button>
        `;

        find_container.append(div);
    }
}

text()