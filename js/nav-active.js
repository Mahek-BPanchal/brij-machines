(function () {
  var navItems = Array.prototype.slice.call(
    document.querySelectorAll(".nav > .nav-link, .nav-dropdown-toggle")
  );
  if (!navItems.length) return;

  var contactLink = navItems.find(function (el) {
    var href = el.getAttribute("href") || "";
    return href === "#contact" || href.slice(-8) === "#contact";
  });

  var defaultActive = navItems.find(function (el) {
    return (
      el.classList.contains("active") ||
      el.getAttribute("aria-current") === "page"
    );
  });

  function clearActive() {
    navItems.forEach(function (item) {
      item.classList.remove("active");
    });
  }

  function setActive(el) {
    if (!el) return;
    clearActive();
    el.classList.add("active");
  }

  function restoreDefault() {
    if (defaultActive) setActive(defaultActive);
  }

  var contact = document.getElementById("contact");
  if (contact && contactLink && "IntersectionObserver" in window) {
    var contactVisible = false;

    var contactObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          contactVisible = entry.isIntersecting && entry.intersectionRatio > 0.12;
          if (contactVisible) {
            setActive(contactLink);
          } else if (!document.querySelector(".nav-dropdown.is-open")) {
            restoreDefault();
          }
        });
      },
      {
        threshold: [0, 0.12, 0.25],
        rootMargin: "-40% 0px -35% 0px",
      }
    );

    contactObserver.observe(contact);
  }

  // Keep clicked hash targets highlighted while scrolling into view
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      var toggle = link.classList.contains("nav-dropdown-toggle")
        ? link
        : link.closest(".nav-dropdown") &&
          link.closest(".nav-dropdown").querySelector(".nav-dropdown-toggle");

      if (link === contactLink || (link.getAttribute("href") || "") === "#contact") {
        setActive(contactLink);
        return;
      }

      if (toggle && link !== toggle) {
        setActive(toggle);
      }
    });
  });
})();
