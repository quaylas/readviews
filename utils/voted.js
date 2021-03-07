const voted = (req, res, votes) => {
    for(i=0;i<votes.length;i++){
        if(votes[i].user_id === req.session.user_id){
            const upvoted = true;
            return upvoted;
        }
    }
    return;
};

module.exports = voted;