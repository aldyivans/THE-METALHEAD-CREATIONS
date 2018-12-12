const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const admin = require('firebase-admin');
const FieldValue = admin.firestore.FieldValue;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const serviceAccount = require('./the-metalhead-creations-firebase-adminsdk-m1fti-ff08449fef.json');
const app = express();

app.use(express.static(__dirname));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
});
 
const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
  fileFilter: fileFilter
}).single("picture");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
db.settings({timestampsInSnapshots: true})

const docRefUser = db.collection('users');
const docRefForum = db.collection('forum');
const docRefComment = db.collection('comments');
const docRefHorns = db.collection('horns');
const docRefReplyComment = db.collection('replyComments');
const docRefMessage = db.collection('message');


const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.listen(PORT, () => {
	console.log("listening on port " + PORT)
});

app.post('/register', (req, res) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, function(err, hash) {
			docRefUser.add({
			  fullname: req.body.fullname,
			  username: req.body.username,
			  birthday: req.body.birthday,
			  gender: req.body.gender,
			  address: req.body.address,
			  email: req.body.email,
			  password: hash
			}).then(ref => {
				res.status(200).json({
					message: 'success'
				})
			  console.log('Added document with ID: ', ref.id);
			});
		})
	})
})

app.post('/login', (req, res) => {
	const reqEmail = req.body.email;
	const reqPassword = req.body.password;
	var emailExist;
	var passwordExist;
	var email = docRefUser.where('email', '==', reqEmail, '&&', 'password', '==', reqPassword)

	email.get().then(snapshot => {
		snapshot.forEach(doc => {
			// console.log(doc.id, '=>', doc.data())
			userId = doc.id;
			emailExist = doc.data().email;
			passwordExist = doc.data().password;
 		})
 		bcrypt.compare(reqPassword, passwordExist, (err, result) => {
			if(result) {
				console.log('OK')
				 var token = jwt.sign({id: userId}, 'secret', {
				 	expiresIn: '24h'
				 });

				 res.status(200).json({
				 	message: 'login success',
				 	token: token,
				 	id: userId
				 })
			} else {
				res.status(404).json({
					message: 'user is not exist'
				})
			}
 		})
	})
	.catch(err => {
		console.log('Error getting documents', err);
	});
})

app.post('/user/upload/',(req,res) => {
  upload(req, res, (err) => {
  	if (err) {
  		console.log(err)
  		res.status(403).json({
	  		message: "select failed!"
	  	})
  	} else {

  		var imgUrl = req.protocol+'://'+req.get('host')+'/'+req.file.path;
  		var filename = req.file.originalname;

  		// console.log(req.body.url)

      if(filename !== "default.png") {
      	fs.unlink("./uploads/"+ filename, err => {
      		if(err) {
      			console.log(err)
      		} else {
      			console.log("gagal")
      		}
      	})
      }

	  	res.status(200).json({
	  		message: "file selected",
	  		imageUrl: imgUrl
	  	})
  	}

  })
})

app.put('/user/editprofile/:id', (req, res) => {
	docRefUser.doc(req.params.id).update({
		fullname: req.body.fullname
	}).then(() => {
  	res.status(200).json({
  		message: 'document successfully deleted'
  	})
  });
})

app.post('/message', (req, res) => {
	docRefMessage.add({
		timestamp: FieldValue.serverTimestamp(),
		userId: req.body.userId,
		recieverId: req.body.recieverId,
		avatar: req.body.avatar,
		username: req.body.username,
	  message: req.body.message
	}).then(ref => {
		res.status(200).json({
			message: 'success'
		})
	  console.log('Added document with ID: ', ref.id);
	}).catch(err => {
    console.log('Error getting documents', err);
  });

})

app.get('/message',(req, res) => {
	var datas;
	var messageData = []
	docRefMessage.get().then(snapshot => {
		snapshot.forEach(doc => {
			datas = {
				data: doc.data(),
				id: doc.id
			}
			messageData.push(datas)
		})
		res.status(200).send(messageData)
	})
	.catch(err => {
    console.log('Error getting documents', err);
  });
})

// app.put('/user/upload/:id', upload.single('avatar'),(req,res) => {
// 	fs.unlink(req.file)
//   docRefUser.doc(req.params.id).update({
//   	avatar: req.file.path
//   })
//   .then(() => {
//   	res.status(200).json({
//   		message: 'document successfully deleted'
//   	})
//   });
// })

// app.get('/user/upload/:id' (req,res) => {
// 	docRefUser.doc(req.params.id).get()
// 	  .then(doc => {
//       console.log(doc.id, '=>', doc.data());
// 			res.send({
// 				userData: doc.data(),
// 				userId: doc.id
// 			})
//     })
// 	  .catch((err) => {
// 	    console.log('Error getting documents', err);
// 	  });
// })

app.post('/forum', (req, res) => {
	docRefForum.add({
		timestamp: FieldValue.serverTimestamp(),
		userId: req.body.userId,
		avatar: req.body.avatar,
		username: req.body.username,
	  topic: req.body.topic,
	  picture: req.body.picture
	}).then(ref => {
		res.status(200).json({
			message: 'success'
		})
	  console.log('Added document with ID: ', ref.id);
	}).catch(err => {
    console.log('Error getting documents', err);
  });

})

app.delete('/forum/:id', (req, res) => {
  docRefForum.doc(req.params.id).delete()
  .then(() => {
  	res.status(200).json({
  		message: 'document successfully deleted'
  	})
  });
	docRefComment.where('forumId', '==', req.params.id).get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				doc.ref.delete()
			})
	});
})

app.put('/forum/:id', (req, res) => {
	docRefForum.doc(req.params.id).update({topic: req.body.editedTopic})
	.then(() => {
  	res.status(200).json({
  		message: 'document successfully deleted'
  	})
  });
})

app.delete('/forum/comment/:id', (req, res) => {
  docRefComment.doc(req.params.id).delete()
  .then(() => {
  	res.status(200).json({
  		message: 'document successfully deleted'
  	})
  });
})

app.post('/forum/upload/', (req, res) => {
	upload(req, res, (err) => {
  	if (err) {
  		console.log(err)
  		res.status(403).json({
	  		message: "select failed!"
	  	})
  	} else {
  		var imgUrl = req.protocol+'://'+req.get('host')+'/'+req.file.path;
	  	res.status(200).json({
	  		message: "file selected",
	  		imageUrl: imgUrl
	  	})
  	}
  })
})

app.get('/forum', (req, res) => {
	var dataForum = [];
	var datas;

	docRefForum.orderBy("timestamp", "desc").get()
	  .then(snapshot => {
	    snapshot.forEach(doc => {
	      console.log(doc.id, '=>', doc.data());

	      datas = {
	      	id: doc.id,
	      	data: doc.data()
	      }
	      dataForum.push(datas);
	    });

		  res.status(200).send({dataForum})
	  })
	  .catch(err => {
	    console.log('Error getting documents', err);
	  });

})


app.get('/user/:id', (req, res) => {
	docRefUser.doc(req.params.id).get()
	  .then(doc => {
      console.log(doc.id, '=>', doc.data());
			res.send({
				userData: doc.data(),
				userId: doc.id
			})
    })
	  .catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.get('/user', (req, res) => {
	var users = [];
	var datas;

	docRefUser.get()
	  .then(snapshot => {
	    snapshot.forEach(doc => {
	      console.log(doc.id, '=>', doc.data());

	      datas = {
	      	id: doc.id,
	      	data: doc.data()
	      }
	      users.push(datas);
	    });

		  res.status(200).send({users})
	  })
	  .catch(err => {
	    console.log('Error getting documents', err);
	  });

})

app.get('/forum/comment/:id', (req, res) => {
	var forumId;
	var comments = [];

	docRefForum.doc(req.params.id).get()
		.then(doc => {
			forumId = doc.id;
		  docRefComment.orderBy("timestamp", "asc").where('forumId', '==', forumId).get()
		  	.then(snapshot => {
		  		snapshot.forEach(ref => {
		  			comments.push({
		  				commentId: ref.id,
		  				commentData: ref.data(),
	  				})
		  		})

	  			res.status(200).send(comments);
		  	})
		  	.catch(err => {
			    console.log('Error getting documents', err);
			  });
		})
		.catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.post('/forum/comment/:id', (req, res) => {
	var forumId;

	docRefForum.doc(req.params.id).get()
		.then(doc => {
			forumId = doc.id;
		  docRefComment.add({
		  	avatar: req.body.avatar,
		  	username: req.body.username,
		  	forumId: forumId,
		  	comment: req.body.comment,
		  	timestamp: FieldValue.serverTimestamp()
		  })
		  .then(() => {
		  	res.status(200).json({
		  		message: 'comment sent'
		  	})
		  })
		})
		.catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.post('/forum/reply-comment/:id', (req, res) => {
	var commentId;

	docRefComment.doc(req.params.id).get()
		.then(doc => {
			forumId = doc.id;
		  docRefReplyComment.add({
		  	avatar: req.body.avatar,
		  	username: req.body.username,
		  	forumId: forumId,
		  	comment: req.body.comment,
		  	timestamp: FieldValue.serverTimestamp()
		  })
		  .then(() => {
		  	res.status(200).json({
		  		message: 'comment sent'
		  	})
		  })
		})
		.catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.post('/forum/horns/:id', (req, res) => {
	var forumId;
	var horns = [];

	docRefForum.doc(req.params.id).get()
		.then(doc => {
			forumId = doc.id;
		  docRefHorns.add({
		  	username: req.body.username,
		  	forumId: forumId,
		  	horns: req.body.horns,
		  	timestamp: FieldValue.serverTimestamp()
		  })
		  .then(() => {
		  	res.status(200).json({
		  		message: 'horned up'
		  	})
		  })
		})
		.catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.get('/forum/horns/:id', (req, res) => {
	var forumId;
	var horns = [];

	docRefForum.doc(req.params.id).get()
		.then(doc => {
			forumId = doc.id;
		  docRefHorns.orderBy("timestamp", "asc").where('forumId', '==', forumId).get()
		  	.then(snapshot => {
		  		snapshot.forEach(ref => {
		  			horns.push({
		  				hornsId: ref.id,
		  				hornsData: ref.data(),
	  				})
		  		})
	  			res.status(200).send(horns);
		  	})
		  	.catch(err => {
			    console.log('Error getting documents', err);
			  });
		})
		.catch((err) => {
	    console.log('Error getting documents', err);
	  });
})

app.delete('/forum/horns/:id', (req, res) => {
	docRefHorns.doc(req.params.id).delete()
	.then(() => {
		res.status(200).json({
			message: 'document successfully deleted'
		})
	})
	.catch((err) => {
    console.log('Error getting documents', err);
  })
})