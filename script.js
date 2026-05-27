var is_sidebar_open = false

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


function menu_btn_change(x) {
    x.classList.toggle("change");

    if (is_sidebar_open == false) {
        openNav();
        is_sidebar_open = true;
    }
    // Fungerer ej, vet ej varför >:
    else {
        closeNav();
        is_sidebar_open = false;
    }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

/* ------------------- Animated background ------------------------*/
/* Copied and edited from: https://reactbits.dev/animations/magnet-lines? */

const container = document.querySelector(".magnetLines_container");

const rows = 10;
const columns = 11;

const containerWidth = "100vw";
const containerHeight = "100vh";

const lineColor = "#444444";

const lineWidth = "5px";

const lineHeight = "80px";

const baseAngle = -10;

container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

container.style.width = containerWidth;
container.style.height = containerHeight;

const total = rows * columns;

for (let i = 0; i < total; i++) {

    const span = document.createElement("span");

    span.style.setProperty("--rotate", `${baseAngle}deg`);

    span.style.backgroundColor = lineColor;

    span.style.width = lineWidth;

    span.style.height = lineHeight;

    container.appendChild(span);
}

const items = container.querySelectorAll("span");

const onPointerMove = pointer => {

    items.forEach(item => {

        const rect = item.getBoundingClientRect();

        // If off-screen, do not run the rest of the code (Returns)
        if (
          rect.bottom < 0 ||
          rect.top > window.innerHeight ||
          rect.right < 0 ||
          rect.left > window.innerWidth
        ) {
          return;
        }

        const centerX = rect.x + rect.width / 2;

        const centerY = rect.y + rect.height / 2;

        const b = pointer.clientX - centerX;

        const a = pointer.clientY - centerY;

        const c = Math.sqrt(a * a + b * b) || 1;

        const r =
            ((Math.acos(b / c) * 180) / Math.PI) *
            (pointer.clientY > centerY ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
    });
};

window.addEventListener("pointermove", onPointerMove);