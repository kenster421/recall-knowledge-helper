export default class RecallKnowledge {
  static ID = 'recall-knowledge';
  static POPUP = 'renderRecallKnowledgePopup';
  static DATA_DC_ID = 'dc';

  static TEMPLATES = {
  };

  static shouldLog = false;

  static log(shouldForce, ...args) {
    const shouldLog = shouldForce || RecallKnowledge.shouldLog;
    if (shouldLog) {
      console.log(RecallKnowledge.ID, '|', ...args);
    }
  };

  static getClickHandler(popup) {
    const playerOptions = game.actors.filter(a => a.type === 'character').map(a => `<option value='${a.id}'>${a.name}</option>`);
    let content = `<h1>Recall Knowledge</h1>
    <hr>
    <select id="actorId">
      ${playerOptions}
    </select>`;

    let dialog = Dialog.prompt({
      content: content,
      title: 'Recall Knowledge',
      rejectClose: false,
      callback: function (dialog) {
        let $dialog = $(dialog);
        let actorId = $dialog.find('#actorId').val();

        let actor = game.actors.get(actorId);
        const filteredSkills = Object.values(actor.data.data.skills).filter(s => popup.data.skills.has(s.slug) || s.lore);

        let d20 = new Roll("1d20");
        d20.roll({ async: false });
        let roll = d20._total;

        let results = '';
        filteredSkills.forEach(function(skill, key){  
          const skillBonus = skill.totalModifier;
          let rollResult = roll + skillBonus;
          results += `<p>${skill.slug.toUpperCase()}: ${rollResult}</p>`;
        });

        let chatContent = `
<div class="pf2e chat-card">
  <header class="card-header flexrow">
    <h3>${actor.name}: Recall Knowledge</h3>
  </header>
  <div class="card-content">
  <h2>Die Roll: ${roll}</h2>
  ${results}
  <section class='roll-note' data-visibility='gm'>
    <p><strong>Critical Success</strong>: You recall the knowledge accurately and gain additional information or context.</p>
    <p><strong>Success</strong>: You recall the knowledge accurately or gain a useful clue about your current situation.</p>
    <p><strong>Critical Failure</strong>: You recall incorrect information or gain an erroneous or misleading clue.</p>
  </section>
</div>
  `;

        ChatMessage.create({ user: game.user._id, content: chatContent, whisper: ChatMessage.getWhisperRecipients("GM"), blind: true }, {});
      }
    });
  }
}