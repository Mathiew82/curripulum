import "./Experience.css";

function Experience() {
  return (
    <div className="editable">
      <h2>Experiencia</h2>
      <article className="experience">
        <h3>Promofarma</h3>
        <div className="position">Frontend engineer</div>
        <div className="date">jun. 2021 - actualidad</div>
        <div className="description">
          Tecnologías: CSS, SASS, JavaScript, Typescript, Vue.js, Vuex, GraphQL,
          Jest, GIT
        </div>
      </article>
      <article className="experience">
        <h3>Housfy</h3>
        <div className="position">Front-End Developer</div>
        <div className="date">dic. 2020 - abr. 2021</div>
        <div className="description">
          Tecnologías: CSS, SASS, JavaScript, Vue.js, Nuxt.js, Vuex, Jest, GIT
        </div>
      </article>
    </div>
  );
}

export default Experience;
