<script>
export default {
    name: "TopMenu",
    data() {
        return {
            isDarkMode: false
        };
    },
    mounted() {
        this.checkDarkMode();
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            if (!this.isDarkMode) {
                localStorage.setItem("mode", "light-mode");
                document.body.classList.remove("dark-mode")
            } else {
                localStorage.setItem("mode", "dark-mode");
                document.body.classList.add("dark-mode")
            }
        },
        checkDarkMode() {
            let getMode = localStorage.getItem("mode");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
            if (getMode && getMode === "dark-mode" && prefersDark.matches) {
                this.isDarkMode = true;
                document.body.classList.add("dark-mode")
            }
        },
        toggleTreeContainer() {
            this.$emitter.emit("toggleTree");
        }
    }
}
</script>

<template>
    <header>
        <img alt="close navbar"
             class="burger"
             src="@assets/burger.svg"
             @click="toggleTreeContainer"/>
        <div class="logo">
            Laravel File Explorer
        </div>
        <div class="dark-mode">
            <div :class="{ active: isDarkMode }"
                 class="toggle"
                 @click="toggleDarkMode">
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    padding: 0.7em 1em;
    border-bottom: 1px solid #e8ebef;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo {
    font-size: 1.3rem;
    font-weight: 500;
    font-style: italic;
    color: #929fb1;
}

.toggle {
    position: relative;
    height: 25px;
    width: 60px;
    border-radius: 100px;
    background-color: #ceced1;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.toggle::before {
    content: "";
    position: absolute;
    height: 25px;
    width: 25px;
    background: #7071E8;
    border-radius: 50%;
    transform: translateX(0%);
    transition: all 0.3s ease-in-out;
}

.toggle.active::before {
    background-color: #555555;
    transform: translateX(150%);
}

.burger {
    cursor: pointer;
}

@media screen and (max-width: 570px) {
    header .logo {
        font-size: 1rem;
    }
}

body.dark-mode header {
    border-bottom: 1px solid #303134;
}

body.dark-mode .toggle {
    background-color: #303134;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
</style>