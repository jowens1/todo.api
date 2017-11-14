const Task = require('../models/tasks');

module.exports = app => {
	app
		.route('/todos')
		.post((req, res) => {
			const task = new Task({
				name: req.body.name,
				note: req.body.note,
			});

			task.save(err => {
				if (err) {
					return res.send(err);
				}

				return res.json({ message: 'New task created' });
			});
		})
		.get((req, res) => {
			Task.find({})
				.sort({ createdAt: -1 })
				.exec((err, task) => {
					if (err) {
						return res.send(err);
					}

					return res.json(task);
				});
		});

	// routes starting with /todos/:id
	app
		.route('/todos/:id')
		.get((req, res) => {
			Task.findById(req.params.id, (err, task) => {
				if (err) {
					return res.send(err);
				}

				return res.json(task);
			});
		})
		.put((req, res) => {
			Task.findByIdAndUpdate(
				req.params.id,
				{
					// fix to this portion to not require passing the name and note in order to avoid nullifying fields
					name: req.body.name,
					note: req.body.note,
					completed: req.body.completed,
				},
				err => {
					if (err) {
						return res.send(err);
					}

					return res.json({ message: 'Task updated successfully' });
				}
			);
		})
		.delete((req, res) => {
			Task.remove({ _id: req.params.id }, err => {
				if (err) {
					return res.send(err);
				}

				return res.json({ message: 'Task has been removed' });
			});
		});
};
