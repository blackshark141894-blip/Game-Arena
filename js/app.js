document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const opened =
                mobileMenu.classList.contains("active");

            menuBtn.textContent =
                opened ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-label",
                opened
                    ? "Close navigation"
                    : "Open navigation"
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

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


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

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


    /* =========================
       TOAST SYSTEM
    ========================= */

    function showToast(message) {

        let toast =
            document.getElementById("gamearenaToast");

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
    /* =========================
       GAME CARDS
    ========================= */

    const gameCards =
        document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        card.addEventListener("click", () => {

            const gameName =
                card.querySelector("h3");

            if (!gameName) {
                return;
            }

            showToast(
                gameName.textContent.trim() +
                " selected"
            );

        });

    });


    /* =========================
       TOURNAMENT TIERS
    ========================= */

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

            const pointsElement =
                card.querySelector("strong");

            const points =
                pointsElement
                    ? pointsElement.textContent.trim()
                    : "";

            const tierElement =
                card.querySelector(":scope > span");

            const tier =
                tierElement
                    ? tierElement.textContent.trim()
                    : "Tournament";

            showToast(
                tier +
                " — " +
                points +
                " Points"
            );

        });

    });


    /* =========================
       HERO MATCH
    ========================= */

    const heroCard =
        document.querySelector(".hero-card");

    if (heroCard) {

        heroCard.addEventListener("click", () => {

            showToast(
                "Live match selected"
            );

        });

    }


    /* =========================
       FOOTER YEAR
    ========================= */

    document
        .querySelectorAll("[data-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });
    /* =========================
       LOGIN
    ========================= */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const username =
                    document
                        .getElementById("loginEmail")
                        .value
                        .trim();

                if (!username) {
                    showToast(
                        "Enter your username"
                    );
                    return;
                }

                showToast(
                    "Login request received"
                );

            }
        );

    }


    /* =========================
       REGISTER
    ========================= */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const username =
                    document
                        .getElementById("registerUsername")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("registerEmail")
                        .value
                        .trim();

                if (!username || !email) {

                    showToast(
                        "Complete all fields"
                    );

                    return;
                }

                showToast(
                    "Account request received"
                );

            }
        );

    }


    /* =========================
       STATUS
    ========================= */

    console.log(
        "🎮 GameArena JS loaded successfully."
    );

});