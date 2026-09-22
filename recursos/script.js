/* IRON HOUSE GYM — interactividad compartida */
document.addEventListener('DOMContentLoaded', function () {

  /*Menú móvil (pure-menu)  */
  var toggleBtn = document.querySelector('.nav-toggle');
  var menuList = document.querySelector('.gym-nav .pure-menu-list');
  if (toggleBtn && menuList) {
    toggleBtn.addEventListener('click', function () {
      menuList.classList.toggle('is-open-mobile');
    });
  }

  /*Carrusel de rutinas*/
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var index = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('is-active');
      dot.setAttribute('aria-label', 'Ir a la rutina ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dotsWrap.querySelectorAll('button').forEach(function (d, di) {
        d.classList.toggle('is-active', di === index);
      });
    }

    carousel.querySelector('.carousel-btn.prev').addEventListener('click', function () { goTo(index - 1); });
    carousel.querySelector('.carousel-btn.next').addEventListener('click', function () { goTo(index + 1); });

    var autoplay = setInterval(function () { goTo(index + 1); }, 6000);
    carousel.addEventListener('mouseenter', function () { clearInterval(autoplay); });
  });

  /*Tabs*/
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var buttons = wrap.querySelectorAll('.tabs-nav button');
    var panels = wrap.querySelectorAll('.tab-panel');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab-target');
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        wrap.querySelector('#' + target).classList.add('is-active');
      });
    });
  });

  /*Accordion (historial de actividades)*/
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      trigger.closest('.accordion-item').classList.toggle('is-open');
    });
  });

  /*Modal de confirmación (genérico)*/
  var modal = document.getElementById('confirm-modal');
  if (modal) {
    var modalTitle = modal.querySelector('[data-modal-title]');
    var modalBody = modal.querySelector('[data-modal-body]');
    var confirmBtn = modal.querySelector('[data-modal-confirm]');
    var pendingAction = null;

    document.querySelectorAll('[data-confirm]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        modalTitle.textContent = trigger.getAttribute('data-confirm-title') || 'Confirmar acción';
        modalBody.textContent = trigger.getAttribute('data-confirm-body') || '¿Deseas continuar?';
        confirmBtn.textContent = trigger.getAttribute('data-confirm-action') || 'Confirmar';
        pendingAction = trigger;
        modal.classList.add('is-open');
      });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { modal.classList.remove('is-open'); });
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('is-open');
    });
    confirmBtn.addEventListener('click', function () {
      modal.classList.remove('is-open');
      if (pendingAction) {
        var row = pendingAction.closest('tr, .list-row');
        if (row && pendingAction.hasAttribute('data-remove-row')) {
          row.style.opacity = '0.4';
          var status = row.querySelector('.badge');
          if (status) { status.textContent = 'Cancelada'; status.className = 'badge badge-off'; }
        }
      }
    });
  }

  /*Notificaciones*/
  var notifBtn = document.querySelector('[data-notif-toggle]');
  var notifPanel = document.querySelector('[data-notif-panel]');
  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      notifPanel.classList.toggle('is-open');
    });
    document.addEventListener('click', function () { notifPanel.classList.remove('is-open'); });
  }

  /* Validación visual básica de formularios */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('was-validated');
      var firstInvalid = form.querySelector(':invalid');
      var successBox = form.querySelector('[data-form-success]');
      if (!firstInvalid) {
        if (successBox) successBox.style.display = 'block';
        form.reset();
        form.classList.remove('was-validated');
      } else {
        if (successBox) successBox.style.display = 'none';
        firstInvalid.focus();
      }
    });
  });

  /* Login / Logout simulado */
  var loginForm = document.getElementById('login-form');
  var loggedOutView = document.getElementById('view-logged-out');
  var loggedInView = document.getElementById('view-logged-in');
  if (loginForm && loggedInView) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      loggedOutView.style.display = 'none';
      loggedInView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      loggedInView.style.display = 'none';
      loggedOutView.style.display = 'block';
    });
  }

  /* Calificación por estrellas  */
  document.querySelectorAll('[data-rating]').forEach(function (widget) {
    var stars = widget.querySelectorAll('button');
    stars.forEach(function (star, i) {
      star.addEventListener('click', function () {
        stars.forEach(function (s, si) { s.textContent = si <= i ? '★' : '☆'; });
        widget.setAttribute('data-value', i + 1);
      });
    });
  });
});
