
 function likePost(button) {
    let count = button.querySelector("span");
    count.innerText = Number(count.innerText) + 1;
}
function addPost() {
    let input = document.getElementById("postinput");
    let text = input.value.trim();

    if (text === "") {
        alert("Please write something!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("div");
    post.className = "post";

  post.innerHTML = `
<h3>Archana</h3>
<p>${text}</p>

<button onclick="likePost(this)">
❤️ Like <span>0</span>
</button>

<button onclick="showComment(this)">💬 Comment</button>
<button onclick="deletePost(this)">🗑 Delete</button>
<button onclick="editPost(this)">✏️ Edit</button>

<div class="comment-box" style="display:none;">
    <input type="text" placeholder="Write a comment...">
    <button onclick="addComment(this)">Post</button>
    <div class="comments"></div>
</div>
`;
    feed.prepend(post);

    input.value = "";
}

function showComment(button) {
    let post = button.parentElement;
    let commentBox = post.querySelector(".comment-box");
    commentBox.style.display = "block";
}

function addComment(button) {
    let input = button.previousElementSibling;
    let comments = button.nextElementSibling;

    if (input.value.trim() === "") {
        alert("Write a comment!");
        return;
    }

    let p = document.createElement("p");
    p.innerText = input.value;

    comments.appendChild(p);

    input.value = "";
}
function deletePost(button) {
    let post = button.parentElement;

    if (confirm("Are you sure you want to delete this post?")) {
        post.remove();
    }
}
function editPost(button) {

    let post = button.parentElement;

    let text = post.querySelector("p");

    let newText = prompt("Edit your post:", text.innerText);

    if (newText !== null && newText.trim() !== "") {
        text.innerText = newText;
    }

}
// async function loadPosts() {
//     try {
//         const response = await fetch("http://localhost:5000/posts");
//         const data = await response.json();

//         console.log(data);
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }
async function loadPosts() {
    try {
        const response = await fetch("http://localhost:5000/posts");
        const posts = await response.json();
        
        const container = document.getElementById("feed"); // apne HTML ke posts container ki ID lagayein
        if (!container) return;

        container.innerHTML = ""; // Purana static data hatane ke liye

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h3>${post.user}</h3>
                <p>${post.content}</p>
            `;
            container.appendChild(postElement);
        });
    } catch (error) {
        console.log("Error loading posts:", error);
    }
}

loadPosts();