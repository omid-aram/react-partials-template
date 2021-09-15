import React, { useState } from 'react'
import { MenuItem, Menu, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { openInNewTab } from '../../../utils/helper';



const SimpleMenu = ({ title, items, children }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickHandler = (item) => {

        if (item.link) {
            handleClose();
            if (item.newTab) {
                openInNewTab(window.location.origin + '/' + item.link);
            } else {
                history.push(item.link)
            }
        }
        if (item.onClick) {
            //-----
            //some time when modal open on click
            //overflowhiden from body automaticly not removed
            var body = document.getElementsByTagName('body')[0];
            body.style.removeProperty("overflow");
            //-----

            handleClose();
            item.onClick();
        }

    }
    const [subItemAnchorEl, setSubItemAnchorEl] = useState(null)
    const subItemHandler = (event) => {
        event.stopPropagation();
        setSubItemAnchorEl(event.currentTarget);
    };
    const handleSubItemClose = (e) => {
        setSubItemAnchorEl(null);
    };
    return (

        <>
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                {children}
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className="sm-menu">
                    {title &&
                        <div className="sm-title">
                            {title}
                        </div>
                    }
                    {items.map((item, i) => (
                        <>
                            <MenuItem key={i} onMouseEnter={item.subItems!=null? subItemHandler:undefined}  onMouseLeave={item.subItems!=null? handleSubItemClose:undefined} onClick={() =>  clickHandler(item)}  className={item.disabled && 'sm-disabled'}>
                                <div className="sm-item">
                                    {item.iconPic &&
                                        <div className="sm-item-icon">
                                            <img src={item.iconPic} />
                                        </div>
                                    }
                                    <div className="sm-item-desc">
                                        <div className="sm-item-title">{item.title}</div>
                                        <div className="sm-item-subtitle">{item.subtitle}</div>
                                    </div>
                                </div>
                                {item.subItems != null && item.subItems.length > 0 &&
                                    <Menu
                                        style={{ pointerEvents: "none" }}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left"
                                        }}
                                        anchorEl={subItemAnchorEl}
                                        open={Boolean(subItemAnchorEl)}
                                    >
                                        <div className="sm-menu" style={{ pointerEvents: "auto" }}>
                                            {item.subItems.map((subItem, index) => (
                                                <MenuItem key={index} onClose={handleClose}>
                                                    <div className="sm-item">
                                                        {subItem.iconPic &&
                                                            <div className="sm-item-icon">
                                                                <img src={subItem.iconPic} />
                                                            </div>
                                                        }
                                                        <div className="sm-item-desc">
                                                            <div className="sm-item-title">{subItem.title}</div>
                                                            <div className="sm-item-subtitle">{subItem.subtitle}</div>
                                                        </div>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </Menu>}
                            </MenuItem>
                            {item.divider && <Divider />}
                        </>
                    ))}
                </div>
            </Menu>
        </>
    )
}

const SimplerMenu = ({ anchor, title, items }) => {

    const [anchorEl, setAnchorEl] = useState(anchor);
    const history = useHistory();


    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickHandler = (item) => {

        if (item.link) {
            history.push(item.link)
        }
        if (item.onClick) {
            item.onClick();
        }

    }

    return (

        <>
            {anchorEl &&
                <Menu
                    anchorEl={anchorEl}

                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <div className="sm-menu">
                        {title &&
                            <div className="sm-title">
                                {title}
                            </div>
                        }
                        {items.map((item, i) => (
                            <>
                                <MenuItem key={i} onClick={() => clickHandler(item)} className={item.disabled && 'sm-disabled'}>
                                    <div className="sm-item">
                                        {item.iconPic &&
                                            <div className="sm-item-icon">
                                                <img src={item.iconPic} />
                                            </div>
                                        }
                                        <div className="sm-item-desc">
                                            <div className="sm-item-title">{item.title}</div>
                                            <div className="sm-item-subtitle">{item.subtitle}</div>
                                        </div>
                                    </div>
                                </MenuItem>
                                {item.divider && <Divider />}
                            </>
                        ))}
                    </div>
                </Menu>
            }
        </>
    )
}


export default SimpleMenu;