import RecallKnowledge from "./modules/recallKnowledge.js";

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(RecallKnowledge.ID);
})

Hooks.on(RecallKnowledge.POPUP, async (popup, element, data) => {
  addClickHandlers(popup, element, data);
});

function addClickHandlers(popup, element, data) {
  RecallKnowledge.getClickHandler(popup);
}