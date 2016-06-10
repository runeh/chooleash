// in 1.1.10

// effect signature
// effects[action.type](action, newState || state, send)

// reducer sig
// newState = xtend(state, reducers[action.type](action, state))

function setProp(obj, name, value) {
    obj[name] = value;
    return obj;
}


function postFeatureEffect() {
    console.log("postFeatureEffect")
    // console.log(a, b, c, d);
}

function setLoadingReducer(action, state) {
    console.log("setLoadingReducer. setting true")
    return setProp(state, 'saving', true);
}

module.exports = {
    namespace: 'new_toggle',
    state: {
        saving: false,
        saved: false,
        name: 'initial_name_here',
        description: '',
        strategy: '',
        active: false
    },

    reducers: {
        save: setLoadingReducer
    },

    effects: {
        save: postFeatureEffect,
    }
};