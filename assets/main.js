document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("cards");

  // shuffle the list

  function shuffle(songs) {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    return songs;
  }

  // Fetch the data
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const shuffledSongs = shuffle(jsonData);

      shuffledSongs.forEach((song) => {
        const card = document.createElement("div");

        const { username, emoji, favJam } = song;

        function extractVideoId(link) {
          const match = link.match(/[?&]v=([^&]+)/);
          return match && match[1] ? match[1] : null;
        }

        // Extract video ID from the YouTube link
        const videoId = extractVideoId(favJam.youtube);

        card.innerHTML = `
           <div class="relative">
                  <div
                    class="h-40 rounded-3xl flex items-center justify-center overflow-hidden relative hover:boc"
                  >
                    <div
                      aria-label=""
                      class="rounded-xl flex absolute z-20"
                    >
                      <a
                        class="rounded-xl p-2.5"
                        href="${favJam.youtube}"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                        >
                          <defs>
                            <linearGradient
                              id="gradient3"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              view
                              y2="0%"
                            >
                              <stop offset="0%" style="stop-color: #ed64a6" />
                              <stop offset="50%" style="stop-color: #d946ef" />
                              <stop offset="100%" style="stop-color: #6366f1" />
                            </linearGradient>
                          </defs>
                          <rect
                            x="6"
                            y="6"
                            width="12"
                            height="12"
                            fill="#1F2933"
                          />
                          <path
                    fill="url(#gradient3)"

                            d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div
                      aria-label=""
                      class="rounded-xl flex absolute -sm"
                    >
                      <img
                        src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
                        alt=""
                        class="flex flex-shrink-0 object-cover h-full w-full"
                      />
                    </div>
                  </div>
                  <div
                    class="mx-1.5 -mt-6 rounded-3xl backdrop-blur-md p-6 text-slate-200 outline outline-slate-800"
                  >
                    <p class=" uppercase tracking-wide text-md font-bold" >
                      ${favJam.title}
                    </p>
                    <p
                      class=" uppercase tracking-wide text-sm font-light"
                    >
                      ${favJam.artist}
                    </p>
                    <div class="mt-4 flex items-center gap-4">
                        <div
                          class="flex flex-col items-center gap-2"
                          
                        >
                          <div
                            class="bg-slate-900 pr-6 text-slate-200 w-full flex flex-row gap-3 items-center"
                          >
                            <button
                              aria-label="Copy Tailwind CSS class names"
                              class="rounded-xl bg-slate-800/75 p-2.5 w-12 h-12 text-xl"
                            >
                              ${emoji}
                            </button>
                            <a
                            href="https://www.github.com/${username}"
                              class=" lowercase tracking-wide text-md font-light hover:text-slate-300"
                              target="_blank"
                            >
                             @${username}
                            </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
