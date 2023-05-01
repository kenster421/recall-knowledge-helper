import RecallKnowledge from "./modules/recallKnowledge.js";

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(RecallKnowledge.ID);
});

Hooks.on(RecallKnowledge.POPUP, async (popup, element, data) => {
  activatePlayerPopup(popup, element, data);
});

function activatePlayerPopup(popup, element, data) {
  RecallKnowledge.activatePlayerPopup(popup, element, data);
}