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
const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");
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

    if (loginForm) {

        loginForm.addEventListener("submit", async event => {

            event.preventDefault();

            const email =
                document.getElementById("loginEmail").value.trim();

            const password =
                document.getElementById("loginPassword").value;

            if (!email || !password) {
                showToast("Enter email and password");
                return;
            }

            const { error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                showToast(error.message);
                return;
            }

            showToast("Login successful");

        });

    }


    /* =========================
       REGISTER
    ========================= */

    if (registerForm) {

        registerForm.addEventListener("submit", async event => {

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

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            if (!username || !email || !password) {
                showToast("Complete all fields");
                return;
            }

            const { data, error } =
                await supabaseClient.auth.signUp({
                    email: email,
                    password: password
                });

            if (error) {
                showToast(error.message);
                return;
            }

            if (data.user) {

                const { error: profileError } =
                    await supabaseClient
                        .from("players")
                        .insert({
                            id: data.user.id,
                            username: username
                        });

                if (profileError) {
                    showToast(profileError.message);
                    return;
                }

            }

            showToast("Account created successfully");

        });

    }


    /* =========================
       STATUS
    ========================= */

    console.log(
        "🎮 GameArena JS loaded successfully."
    );

});
    