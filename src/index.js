const choo = require('choo');

const addToggleModel = require('./models/newtoggle.js');
const mainModel = require('./models/global');


const app = choo();

app.model(mainModel);
app.model(addToggleModel);

const mainView = (params, state, send) => choo.view`
    <main>
        <h1>tertle - Inited? ${state.inited} - error ${!!state.error}</h1>
        ${state.showCreateBox ? makeCreateBox(send, state) : makeAddButton(send)}
        ${makeFeatureList(state.features)}
    </main>
`;

function makeAddButton(send) {
    const onclick = _ => send('showCreateBox');
    return choo.view`
        <button type="button" onclick=${onclick}>
            New feature toggle
        </button>
    `;
}

function makeCreateBox(send, state) {
    console.log("state in make create box")
    const newToggle = state.new_toggle;
    return choo.view`
        <div class="b-create">
            <form onsubmit=${onSubmit} ${newToggle.saving ? "disabled" : ""}>
                <fieldset>
                    <label>Name</label>
                    <input type="text" name="name" autofocus />
                </fieldset>
                <fieldset>
                    <label>description</label>
                    <input type="text" name="description" />
                </fieldset>
                <fieldset>
                    <label>strategy</label>
                    <input type="text" name="strategy" />
                </fieldset>
                <fieldset>
                    <label>active</label>
                    <input type="checkbox" name="strategy" />
                </fieldset>
                <button type="submit">Lagre</button>
                <button type="button" onclick=${onCancel}>Avbryt</buttton>
            </form>
        </div>
    `;
    
    function onSubmit(event) {
        event.preventDefault()
        console.log("onsubmit handler")
        window.lol = new FormData(event.target);
        send('new_toggle:save', { data: new FormData(event.target) })
    }

    function onCancel() {
        send('cancelnewToggle');
    }

}


function makeFeatureList(features) {
    return choo.view`
        <div>
            ${features.map(makeFeatureItem)}
        </div>
    `;
}

function makeFeatureItem(feature) {
    return choo.view`
        <div class="f-item">
            <h3>
                <span class="state-icon"></span>
                ${feature.name}
            </h3>
            <p>${feature.description}</p>
            <p><a href="/feature/${feature.name}">Edit</a>
        </div>
    `;
}

function featureView(params, state, send) {
    console.log(params)
    return choo.view`<a href="/">lol</a>`;
}

app.router((route) => [
  route('/', mainView),
  route('/feature/:feature', featureView),
]);

const tree = app.start();
document.body.appendChild(tree);
