export default function ResponsiveSidebar(props) {
    // console.log(props)
    const sidebar = document.getElementById("sidebarId")
    const main = document.getElementById("main")

    if (sidebar.style.getPropertyValue("width") === "0px"){
        sidebar.style.width = "10rem"
        main.style.marginRight = "10rem"
    } else {
        sidebar.style.width = "0"
        main.style.marginRight = "0"
    }
}