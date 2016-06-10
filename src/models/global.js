
function setProp(obj, key, val) {
    obj[key] = val;
    return obj;
}

function loadFeatures(state, action, send) {
    // fetch('https://httpbin.org/get')
    fetch('https://jsonp.afeld.me/?url=http://unleash.herokuapp.com/features')
        .then(e => e.json())
        .then(e => send('initialFeaturesOk', {features: e}))
        .catch(e => send('initialFeaturesFailed', {error: e}));
}

module.exports = {
    state: {
        features: [],
        inited: false,
        error: null,
        showCreateBox: false
    },
    subscriptions: [
        send => {
            send('loadFeatures')
        }
    ],
    reducers: {
        'initialFeaturesOk': (action, state) => {
            state.inited = true;
            state.features = action.features.features;
            console.log(state)
            return state;
        },
        'initialFeaturesFailed': (action, state) => {
            state.error = action.error;
            return state;
        },
        'showCreateBox': (a, s) => setProp(s, 'showCreateBox', true),
        'cancelnewToggle': (a, s) => setProp(s, 'showCreateBox', false),
        'submitNewToggle': _ => 1
    },

    effects: {
        'loadFeatures': loadFeatures
    }
}