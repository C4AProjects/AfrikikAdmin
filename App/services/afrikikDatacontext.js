define([
	'durandal/system',
	'durandal/app',
	'config',
	'services/logger', 'viewmodels/shell'],
	function (system, app, config, logger,shell) {

	    //#region Players


	    var getTeamPlayers = function (teamId,onRetrieve) {
	        var url = config.composeTeamPlayersSevice(teamId);
	    return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var getPlayers = function (onRetrieve) {
	        var url = config.playerService;
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };

	    var searchPlayers = function (searchText,onRetrieve) {
	    	var url = config.playerService+"/search/"+searchText;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var searchPlayersByCountry = function (searchText,onRetrieve) {
	    	var url = config.playerService+"?country="+searchText;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

var searchPlayersByClub = function (searchText,onRetrieve) {
	    	var url = config.playerService+"?club="+searchText;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var getPlayerById = function (id, onRetrieve) {
	    	var url = config.playerService+'/'+id;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	   
	    var createPlayer = function (data, onComplete) {
	    	var url = config.playerService;
	    	var player = {
	    		country: data().country(),
	    		description: data().description(),
	    		name: data().name(),
	    		position: data().position(),
	    		img_url: data().img_url(),
	    		clubcountry: data().clubcountry(),
	    		club: data().club(),
	    		no: data().no(),
	    		weight: data().weight(),
	    		height: data().height(),
	    		dob: data().dob(),
	    		birth_place: data().birth_place()
	    	};
	        //console.log(token);
	        $.ajax({
	        	url: url,
	        	type: 'POST',
	        	contentType: 'application/json',
	        	dataType: 'json',
	        	data: JSON.stringify(player),
	        	success: function (data) {
	        		onComplete(data, false);
	        	},
	        	error: function (data) {
	        		onComplete(data, true);
	        	}
	        });

	    };

        var deletePlayer = function (id, onComplete) {
	    	var url = config.playerService;
	        //console.log(token);
	        $.ajax({
	        	url: url+'/'+id,
	        	type: 'DELETE',
	        	contentType: 'application/json',
	        	dataType: 'json',	        	
	        	success: function (result) {
	        		onComplete(result, false);
	        	},
	        	error: function (result) {
	        		onComplete(result, true);
	        	}
	        });

	    };
	    var updatePlayer = function (data, onComplete) {
	    	var url = config.playerService;

	    	var player = {
	    		country: data().country(),
	    		description: data().description(),
	    		name: data().name(),
	    		position: data().position(),
	    		img_url: data().img_url(),
	    		clubcountry: data().clubcountry(),
	    		club: data().club(),
	    		no: data().no(),
	    		weight: data().weight(),
	    		height: data().height(),
	    		dob: data().dob(),
	    		birth_place: data().birth_place(),
	    		rating:data().rating(),
	    		isNational:data().isNational()
	    	};
	        //console.log(token);
	        $.ajax({
	        	url: url+'/'+data().id(),
	        	type: 'PUT',
	        	contentType: 'application/json',
	        	dataType: 'json',
	        	processData: false,
	        	data: JSON.stringify(player),
	        	success: function (data) {
	        		onComplete(data, false);
	        	},
	        	error: function (data) {
	        		onComplete(data, true);
	        	}
	        });

	    };
	    //#endregion

	    //#region Teams
	    var getTeamById = function (id, onRetrieve) {
	        var url = config.teamService + '/' + id;
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };

	    var searchTeams = function (searchText,onRetrieve) {
	    	var url = config.teamService+"/search/"+searchText;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var getTeams = function (onRetrieve) {
	    	var url = config.teamService;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var createTeam = function (data, onComplete) {
	    	var url = config.teamService;
	    	var team = {	    		
	    		name: data().name(),
	    		img_url:data().img_url()
	    	};
	        //console.log(token);
	        $.ajax({
	        	url: url,
	        	type: 'POST',
	        	contentType: 'application/json',
	        	dataType: 'json',
	        	data: JSON.stringify(team),
	        	success: function (result) {
	        		onComplete(result, false);
	        	},
	        	error: function (result) {
	        		onComplete(result, true);
	        	}
	        });

	    };

	    var updateTeam = function (data, onComplete) {
	    	var url = config.teamService;

	    	var team = {
	    		league: data().league(),	    		
	    		name: data().name(),
	    		association: data().association(),
	    		img_url:data().img_url(),
	    		_id:data().id()
	    	};
	        //console.log(token);
	        $.ajax({
	        	url: url+'/'+team._id,
	        	type: 'PUT',
	        	contentType: 'application/json',
	        	dataType: 'json',
	        	processData: false,
	        	data: JSON.stringify(team),
	        	success: function (result) {
	        		onComplete(result, false);
	        	},
	        	error: function (result) {
	        		onComplete(result, true);
	        	}
	        });

	    };
	    var updateClub = function (data, onComplete) {
	        var url = config.teamService;

	        var team = {
	            country: data().country(),
	            name: data().name(),
	            location: data().location(),
	            img_url: data().img_url(),
	            _id: data().id()
	        };
	        //console.log(token);
	        $.ajax({
	            url: url + '/' + team._id,
	            type: 'PUT',
	            contentType: 'application/json',
	            dataType: 'json',
	            processData: false,
	            data: JSON.stringify(team),
	            success: function (result) {
	                onComplete(result, false);
	            },
	            error: function (result) {
	                onComplete(result, true);
	            }
	        });

	    };

	    var deleteTeam = function (id, onComplete) {
	    	var url = config.teamService;
	        //console.log(token);
	        $.ajax({
	        	url: url+'/'+id,
	        	type: 'DELETE',
	        	contentType: 'application/json',
	        	dataType: 'json',	        	
	        	success: function (result) {
	        		onComplete(result, false);
	        	},
	        	error: function (result) {
	        		onComplete(result, true);
	        	}
	        });

	    };
	    //#endregion

	    //#region Users
	    var getUsers = function (onRetrieve) {
	    	var url = config.userService;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };

	    var searchUsers = function (searchText,onRetrieve) {
	    	var url = config.userService+"/search/"+searchText;
	    	return $.ajax({
	    		url: url,
	    		contentType: 'application/json',
	    		dataType: 'json',
	    		success: function (data) {
	    			onRetrieve(data, false);
	    		},
	    		error: function (data) {
	    			onRetrieve(data, true);
	    		}
	    	});
	    };
	    //#endregion


       //#region Feeds
	    var getFeeds = function (onRetrieve) {
	        var url = config.composeFeedService(shell.userid());
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };

	    var getComFeeds = function (onRetrieve) {
	        var url = config.composeCommunityFeedService(shell.userid());
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };
	    var getPlayerFeeds = function (playerid,onRetrieve) {
	        var url = config.composePlayerFeedService(shell.userid(), playerid);
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };
	    var getTeamFeeds = function (teamid, onRetrieve) {
	        var url = config.composeTeamFeedService(shell.userid(), teamid);
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    };
	    var createComFeed = function (data, onComplete) {
	        var url = config.composeFeedService(shell.userid());;
	        var feed = {
	            feedType: "community",
	            message: data()
	        };
	        //console.log(token);
	        $.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(feed),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });

	    };
	    var createTeamFeed = function (teamid,data, onComplete) {
	        var url = config.composeFeedService(shell.userid());;
	        var feed = {
	            _team: teamid,
	            _user: shell.userid(),
	            message: data()
	        };
	        //console.log(token);
	        $.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(feed),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });

	    };
	    var createPlayerFeed = function (playerid,data, onComplete) {
	        var url = config.composeFeedService(shell.userid());
	        var feed = {
	            _player:playerid,
	            _user: shell.userid(),
	            message: data()
	        };
	        //console.log(token);
	        $.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(feed),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });

	    };
	    var deleteFeed = function (id, onComplete) {
	        var url = config.composeFeedService(shell.userid());
	        //console.log(token);
	        $.ajax({
	            url: url + id,
	            type: 'DELETE',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (result) {
	                onComplete(result, false);
	            },
	            error: function (result) {
	                onComplete(result, true);
	            }
	        });

	    };

       //#endregion
	    var Login = function (email, password, successCallback, failureCallback) {

	        var loginForm = '{ "username": "'+email()+'", "email": "'+email()+'", "password": "'+password()+'", "grant_type": "password", "client_id": "Afrikik2014", "client_secret": "F00tb@llIsK1ng1NAfriAY3s", "redirect_uri": "http://m-afrikik.c4adev.co.vu", "site": "http://m-afrikik.c4adev.co.vu" }';
	        //console.log(loginForm);
	        var url = config.loginService;
	        $.ajax({
	            url: url,
	            data: loginForm,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	        }).then(function (result) {
	            successCallback(result);
	        },
            function (data) {
                failureCallback(data);
            });

	    };
	    
	    var RegisterUser = function (name,email, password, successCallback, failureCallback) {

	        var registerForm = "{name:'"+name()+"', email:'" + email() + "', password:'" + password() + "'}";
	        //console.log(loginForm);
	        var url = config.userService;
	        $.ajax({
	            url: url,
	            data: registerForm,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	        }).then(function (result) {
	            successCallback(result);
	        },
            function (data) {
                failureCallback(data);
            });

	    };

	    var createPlayerStats = function (data, onComplete) {
	        var url = config.PlayerStatService(shell.userid());
	        var stat = {
	            _player: data().player(),
	            league:data().league(),
	            season:data().season(),
	            minutes:data().minutes(),
	            redc:data().redc(),
	            games:data().games(),
	            goals:data().goals(),
	            team:data().team(),
	            yellowc:data().yellowc()
	        };
	        $.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(stat),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });
	    }
	    var deletePlayerStats = function (statId, onRetrieve) {
	        var url = config.composePlayerStatService(shell.userid());
	        //console.log(token);
	        $.ajax({
	            url: url + statId,
	            type: 'DELETE',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (result) {
	                onComplete(result, false);
	            },
	            error: function (result) {
	                onComplete(result, true);
	            }
	        });
	    }
	    var getPlayerStats = function (playerId, onRetrieve) {
	        var url = config.playerService + '/'+playerId+'/stats';
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    }
	    var updatePlayerStats = function (statId, data, onComplete) {
	        var url = config.composePlayerStatService(shell.userid(),statId);
	        var stat = {
	            _player: data().player(),
	            league: data().league(),
	            season: data().season(),
	            minutes: data().minutes(),
	            redc: data().redc(),
	            games: data().games(),
	            goals: data().goals(),
	            team: data().team(),
	            yellowc: data().yellowc()
	        };
	        $.ajax({
	            url: url,
	            type: 'PUT',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(stat),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });
	    }

	    var createTeamStats = function (data, onComplete) {
	        var url = config.TeamStatService(shell.userid());
	        var stat = {
	           
	        };
	        $.ajax({
	            url: url,
	            type: 'POST',
	            contentType: 'application/json',
	            dataType: 'json',
	            data: JSON.stringify(stat),
	            success: function (data) {
	                onComplete(data, false);
	            },
	            error: function (data) {
	                onComplete(data, true);
	            }
	        });
	    }
	    var deleteTeamStats = function (statId, onRetrieve) {
	        var url = config.composeTeamStatService(shell.userid(), statId);
	        //console.log(token);
	        $.ajax({
	            url: url,
	            type: 'DELETE',
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (result) {
	                onComplete(result, false);
	            },
	            error: function (result) {
	                onComplete(result, true);
	            }
	        });
	    }
	    var getTeamStats = function (statId,onRetrieve) {
	        //var url = config.composeTeamStatService(shell.userid(), statId);
	        var url = "http://m-afrikik.c4adev.co.vu:2014/api/v1/users/538cb1495005f1c816ecfe73/stats/53a01217f3ffe01324f07087/team";
	        //var url = "http://m-afrikik.c4adev.co.vu:2014/api/v1/players/538cfbbbf3ffe0a991ca2a95/stats";
	        return $.ajax({
	            url: url,
	            contentType: 'application/json',
	            dataType: 'json',
	            success: function (data) {
	                onRetrieve(data, false);
	            },
	            error: function (data) {
	                onRetrieve(data, true);
	            }
	        });
	    }
	    var updateTeamStats = function (statId,onRetrieve) { }


	    var dataContext = {	        

	    	getTeams: getTeams,	        
	    	getTeamById: getTeamById,
	    	searchTeams:searchTeams,
	    	createTeam:createTeam,
	    	updateTeam: updateTeam,
	    	updateClub:updateClub,
	    	deleteTeam:deleteTeam,

	    	getUsers:getUsers,
	    	searchUsers:searchUsers,

	    	getPlayers: getPlayers,
	    	getPlayerById: getPlayerById,
	    	searchPlayers:searchPlayers,
	    	searchPlayersByCountry:searchPlayersByCountry,
	    	searchPlayersByClub:searchPlayersByClub,
	    	createPlayer:createPlayer,
	    	deletePlayer:deletePlayer,
	    	updatePlayer: updatePlayer,
	    	RegisterUser: RegisterUser,
	    	Login: Login,

	    	getFeeds: getFeeds,
	    	getComFeeds: getComFeeds,
	    	createComFeed: createComFeed,
	    	deleteFeed: deleteFeed,
	    	getPlayerFeeds: getPlayerFeeds,
	    	getTeamFeeds: getTeamFeeds,
	    	createPlayerFeed: createPlayerFeed,
	    	createTeamFeed: createTeamFeed,

	    	createPlayerStats: createPlayerStats,
	    	deletePlayerStats: deletePlayerStats,
	    	getPlayerStats: getPlayerStats,
	    	updatePlayerStats: updatePlayerStats,

	    	createTeamStats: createTeamStats,
	    	deleteTeamStats: deleteTeamStats,
	    	getTeamStats: getTeamStats,
	    	updateTeamStats: updateTeamStats,

	    	getTeamPlayers: getTeamPlayers
	    };
	    return dataContext;
	});