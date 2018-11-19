import oToast from './lib/o-toast.js';
import oModal from './lib/o-modal.js';
import oPanel from './lib/o-panel.js';

(async function() {

	await Oxe.setup({
		component: {
			components: [
				oPanel,
				oModal,
				oToast
			]
		}
	});

	var t = 1;
	var m = 1;
	var panel = document.querySelector('o-panel');
	var toast = document.createElement('o-toast');
	var modal = document.createElement('o-modal');

	panel.model.title = 'Title';

	// panel.notify({
	//     title: 'title',
	//     message: 'message',
	//     details: 'details'
	// });

	window.toast = function () {
		toast.open({
			title: t++,
			message: 'message'
		});
	};

	window.modal = function () {
		modal.open({
			title: m++,
			message: 'message',
			cancel: function () {
				modal.close();
			}
		});
	};

	document.body.appendChild(modal);
	document.body.appendChild(toast);

}()).catch(console.error);
