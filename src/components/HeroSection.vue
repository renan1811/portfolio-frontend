<template>
  <section aria-labelledby="hero-title" class="page-container hero flex w-full flex-1 flex-col">
    <div class="hero-intro flex items-center gap-5 md:gap-9">
      <span aria-hidden="true" class="intro-rule h-px w-11 shrink-0 bg-accent md:w-20"></span>
      <p class="eyebrow text-[0.66rem] font-medium tracking-[0.15em] sm:text-[0.78rem] md:text-[0.9rem]">
        SOFTWARE DEVELOPER — PORTFOLIO / 2026
      </p>
    </div>

    <h1 id="hero-title" class="hero-title mt-14 font-editorial leading-[0.78] md:mt-16">
      <span class="title-name block text-ink">Renan de Lima.</span>
      <span class="title-role block text-accent italic">
        <span class="role-word">Software</span>{{ ' ' }}
        <span class="role-word">Developer.</span>
      </span>
    </h1>

    <div class="hero-description mt-16 ml-auto max-w-[38rem] border-l border-accent pl-6 sm:pl-9 md:mt-20 lg:mr-[2%]">
      <p class="text-[1.12rem] leading-[1.48] tracking-[-0.025em] text-ink sm:text-[1.35rem] md:text-[1.7rem] lg:text-[1.9rem]">
        Sou Renan, desenvolvedor de software. Crio aplicações web que unem funcionalidade, clareza e uma boa experiência de uso.
      </p>
    </div>

    <div class="hero-footer mt-auto pt-20 pb-7 md:pt-24 md:pb-11">
      <div class="flex flex-col gap-4 text-[0.68rem] font-medium tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between sm:text-[0.78rem] md:text-[0.85rem]">
        <p>BASED IN SANTA CATARINA, BRAZIL</p>
        <a class="interactive-line flex items-center gap-2" href="#work">EXPLORE WORK <span aria-hidden="true" class="text-[1.2em]">↘</span></a>
      </div>
      <div aria-hidden="true" class="mt-5 h-px w-full bg-line md:mt-6"></div>
    </div>
  </section>
</template>

<style scoped>
.hero { min-height: calc(100svh - 6.75rem); }
.hero-intro { padding-top: clamp(4rem, 8.5vh, 7rem); }
.eyebrow { line-height: 1.5; }
.title-name {
  font-size: clamp(4rem, 14vw, 12.75rem);
  letter-spacing: -0.073em;
  animation: rise-in 900ms var(--ease-editorial) 120ms both;
}
.title-role {
  font-size: clamp(3.7rem, 13.5vw, 12.1rem);
  letter-spacing: -0.072em;
  animation: rise-in 900ms var(--ease-editorial) 290ms both;
}
.role-word + .role-word { margin-left: 0.06em; }
.hero-description { animation: appear 850ms var(--ease-editorial) 500ms both; }

@media (min-width: 768px) and (max-height: 950px) {
  .hero-intro { padding-top: clamp(2rem, 4vh, 3rem); }
  .hero-title { margin-top: 3rem; }
  .hero-description { margin-top: 2.5rem; }
  .hero-footer { padding-top: 2.5rem; padding-bottom: 1.5rem; }
}

@media (max-width: 767px) {
  .hero { min-height: calc(100svh - 5.5rem); }
  .hero-intro { padding-top: clamp(3.2rem, 8vh, 5.5rem); }
  .title-name { font-size: clamp(3.3rem, 12.7vw, 6.7rem); }
  .title-role { font-size: clamp(3.35rem, 11.5vw, 6.2rem); }
}

@media (max-width: 479px) {
  .hero-title { margin-top: 3.5rem; }
  .title-name { font-size: clamp(2.8rem, 12.8vw, 3.7rem); }
  .title-role {
    margin-top: 0.12em;
    font-size: clamp(3.35rem, 15.7vw, 4.4rem);
    line-height: 0.81;
  }
  .role-word { display: block; }
  .role-word + .role-word { margin-left: 0; }
  .hero-description { margin-top: 3.4rem; }
}

@media (prefers-reduced-motion: reduce) {
  .title-name, .title-role, .hero-description { animation: none; }
}
</style>
