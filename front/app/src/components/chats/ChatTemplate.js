import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import defaultChatMsgStyles from '@mui-treasury/styles/chatMsg/default';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { IconButton } from '@mui/material';

const timeStyle = {
  position:"absolute",
  top:-20, 
  left:0,
  color:"#808080"
}

const deleteStyle = {
  position:"absolute",
  top:10,
  left:-30,
  color:"#808080",
}



const ChatTemplate = withStyles(defaultChatMsgStyles, { name: 'ChatMsg' })(props => {
  const {
    classes,
    avatar,
    message,
    roomId,
    time,
    cancelSend,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
  } = props;
  
  const [deletable, setDeletable] = useState(false);

  const attachClass = index => {
    if (index === 0) {
      return classes[`${side}First`];
    }
    if (index === [message.content].length - 1) {
      return classes[`${side}Last`];
    }
    return '';
  };
  return (
    <Grid
      container
      spacing={5}
      style={{justifyContent: side === 'right' ? 'flex-end' : 'flex-start'}}
      {...GridContainerProps}
    >
      {side === 'left' && (
        <Grid item {...GridItemProps}>
          <Avatar
            src={avatar}
            {...AvatarProps}
            className={cx(classes.avatar, AvatarProps.className)}
          />
        </Grid>
      )}
      <Grid item xs={8}>

        {[message.content].map((msg, i) => {
          
          const TypographyProps = getTypographyProps(msg, i, props);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div 
              key={i} 
              className={classes[`${side}Row`]}
            >  
              <Typography
                align={'left'}
                  {...TypographyProps}
                  className={cx(
                    classes.msg,
                    classes[side],
                    attachClass(i),
                    TypographyProps.className
                  )}
                  onMouseOver={()=>setDeletable(true)}
                  onMouseOut={()=>setDeletable(false)}
                  style={{position: "relative"}}
                >
                  {msg}
                  <span style={timeStyle}>
                    {time}
                  </span>
                
                {side==="right" && 
                  <IconButton 
                    style={{...deleteStyle, display: deletable ? "block" : "none"}}
                    onClick={()=>{cancelSend(roomId, message.id)}}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                }
              </Typography>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
});
ChatTemplate.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right']),
  GridContainerProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  AvatarProps: PropTypes.shape({}),
  getTypographyProps: PropTypes.func,
};
ChatTemplate.defaultProps = {
  avatar: '',
  messages: [],
  side: 'left',
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: () => ({}),
};


export default ChatTemplate;