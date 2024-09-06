(function () {
	var storageKey = "theme-preference";

	var getColorPreference = function () {
		if (localStorage.getItem(storageKey))
			return localStorage.getItem(storageKey);
		else
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
	};

	var theme = { value: getColorPreference() };

	var reflectPreference = function () {
		document.documentElement.classList.remove("bg-light", "bg-dark");
		document.documentElement.classList.add("bg-" + theme.value);
		document
			.querySelector("#theme-toggle")
			?.setAttribute("aria-label", theme.value);
	};

	reflectPreference();

	window.onload = function () {
		reflectPreference();

		document
			.querySelector("#theme-toggle")
			?.addEventListener("click", function () {
				theme.value = theme.value === "light" ? "dark" : "light";
				localStorage.setItem(storageKey, theme.value);
				reflectPreference();
			});
	};

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", function ({ matches: isDark }) {
			theme.value = isDark ? "dark" : "light";
			localStorage.setItem(storageKey, theme.value);
			reflectPreference();
		});
})();

(function () {
	const theme =
		localStorage.getItem("theme-preference") ||
		(window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light");
	document.documentElement.classList.add(`bg-${theme}`);
})();
