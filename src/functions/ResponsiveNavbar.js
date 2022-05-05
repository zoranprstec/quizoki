export default function ResponsiveNavbar() {
    var nav = document.getElementById("myNavbar")
    if (nav.className === "responsive") {
        nav.className = ""
    } else {
        nav.className = "responsive"
    }
}