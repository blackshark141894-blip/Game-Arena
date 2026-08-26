document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const opened =
                mobileMenu.classList.contains("active");

            menuBtn.textContent = opened ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-label",
                opened
                    ? "Close navigation"
                    : "Open navigation"
            );

        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });
    }


    /* ===============================
       SMOOTH SCROLL
    =============================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ===============================
       GAME CARDS
    =============================== */

    const gameCards =
        document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        card.addEventListener("click", () => {

            const gameName =
                card.querySelector("h3");

            if (!gameName) {
                return;
            }

            const name =
                gameName.textContent.trim();

            showToast(
                `${name} selected`
            );

        });

    });


    /* ===============================
       TOURNAMENT TIERS
    =============================== */

    const tierCards =
        document.querySelectorAll(".tier-card");

    tierCards.forEach(card => {

        const button =
            card.querySelector("button");

        if (!button) {
            return;
        }

        button.addEventListener("click", event => {

            event.preventDefault();

            const tier =
                card.querySelector(":scope > span");

            const points =
                card.querySelector("strong");

            const tierName =
                tier
                    ? tier.textContent.trim()
                    : "Tournament";

            const pointValue =
                points
                    ? points.textContent.trim()
                    : "";

            showToast(
                `${tierName} — ${pointValue} Points`
            );

        });

    });


    /* ===============================
       LIVE MATCH CARD
    =============================== */

    const heroCard =
        document.querySelector(".hero-card");

    if (heroCard) {

        heroCard.addEventListener("click", () => {

            showToast(
                "Live match selected"
            );

        });

    }


    /* ===============================
       TOAST
    =============================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "gamearenaToast"
            );

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "gamearenaToast";

            toast.className =
                "gamearena-toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.timer);

        toast.timer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2200);

    }


    /* ===============================
       FOOTER YEAR
       Works if data-year exists
    =============================== */

    document
        .querySelectorAll("[data-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* ===============================
       STATUS
    =============================== */

    console.log(
        "🎮 GameArena JS loaded successfully."
    );

});