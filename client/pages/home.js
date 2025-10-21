/**
 * Todo: Implement home screen
 */

function Avatar(){
const imgContainer = document.createElement("div")
imgContainer.className = "avatar-image"

const avatar = document.createElement("img")
avatar.src = "assets/mike-holding-guitar.png"

imgContainer.appendChild(avatar)
return imgContainer;
}


export default function Home(){
    const container = document.createElement("div")
    container.className = "main-container"

    const avatar = Avatar();

    const name = document.createElement("h1")
    name.innerText = "Michael Medvedev"
    name.className = "author-name"

    const job = document.createElement("h4")
    job.innerText = "Software Engineer"
    job.className = "author-job"

    const p1 = document.createElement("p")
    p1.innerText = "I'm an entrepreneur, engineer, musician, and snowboarder. I am the founder of Gilded Guitars and more recently, infatuated with programming. I build with the goal of impacting millions for the better."

    const p2 = document.createElement("p")
    p2.innerText = "I'm open sourcing my life, tracking every activity I do, to visualize passion."

    const p3 = document.createElement("p")
    p3.innerText = '"Little by little, one travels far." — J.R.R. Tolkien'

    container.append(avatar, name, job, p1, p2, p3);
    return container
}

