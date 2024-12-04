document.addEventListener("DOMContentLoaded", function () {
	const userList = document.getElementById("user-list");
	const userIdInput = document.getElementById("user-id-input");
	const searchButton = document.getElementById("search-button");
	const userResult = document.getElementById("user-result");

	// List users
	function fetchUsers() {
		fetch("https://localhost:7282/api/users")
			.then(response => {
				if (!response.ok) {
					throw new Error("Error fetching users");
				}
				return response.json();
			})
			.then(data => {
				displayUsers(data);
			})
			.catch(error => {
				userList.innerHTML = `<tr><td colspan="2" class="text-danger">Error loading users. Please try again later.</td></tr>`;
			});
	}

	// Display users
	function displayUsers(users) {
		users.forEach(user => {
			const row = document.createElement("tr");
			row.innerHTML = `
                 <td>${user.id}</td>
                 <td>${user.name}</td>
             `;
			userList.appendChild(row);
		});
	}

	// Search user by ID
	function fetchUserById(userId) {
		fetch(`https://localhost:7282/api/users/${userId}`)
			.then(response => {
				if (!response.ok) {
					if (response.status === 404) {
						throw new Error("User not found");
					} else {
						throw new Error("Error fetching user");
					}
				}
				return response.json();
			})
			.then(user => {
				displayUserResult(user);
			})
			.catch(error => {
				userResult.classList.remove("d-none", "alert-success");
				userResult.classList.add("alert", "alert-danger");
				userResult.innerHTML = `${error.message}`;
			});
	}

	function displayUserResult(user) {
		userResult.classList.remove("d-none", "alert-danger");
		userResult.classList.add("alert", "alert-success");
		userResult.innerHTML = `ID: ${user.id}, Name: ${user.name}`;
	}

	searchButton.addEventListener("click", function () {
		const userId = userIdInput.value;
		if (userId) {
			fetchUserById(userId);
		} else {
			userResult.classList.remove("d-none", "alert-success");
			userResult.classList.add("alert", "alert-warning");
			userResult.innerHTML = "Please enter a valid user ID.";
		}
	});

	fetchUsers();
});
