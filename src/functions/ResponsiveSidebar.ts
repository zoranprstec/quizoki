export default function ResponsiveSidebar() {
    const sidebar = document.getElementById("sidebarId")
    const main = document.getElementById("main")

    if (main !== null && sidebar !== null) {
        if (sidebar.style.getPropertyValue("width") === "0px"){
            sidebar.style.width = "10rem"
            main.style.marginRight = "10rem"
        } else {
            sidebar.style.width = "0"
            main.style.marginRight = "0"
        }
    } else {
        alert("Cannot find appropriate id's for Sidebar and Main")
    }
}