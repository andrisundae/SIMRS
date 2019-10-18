import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Tree from 'rc-tree';

class TreeView extends Component {
    constructor(props) {
        super(props);
        this.tree = createRef();

        this._getKeyEntities = this._getKeyEntities.bind(this);
        this._getNode = this._getNode.bind(this);
    }

    navigation = (e) => {
        switch (e.keyCode) {
            case 40:
                e.preventDefault();
                this._nextNode();
                break
            case 38:
                e.preventDefault();
                this._prevNode();
                break
            case 37:
                e.preventDefault();
                this._collapseNode();
                break
            case 39:
                e.preventDefault();
                this._expandNode();
                break
            case 32:
                // e.preventDefault();
                this._checkNode(e)
                break
            default:
        }
    }

    render() {

        return (
            <div onKeyDown={this.props.navigation ? this.navigation : () => {}} tabIndex="-1">
                <Tree
                    ref={this.tree}
                    {...this.props}
                />
            </div>
        );
    }

    _getKeyEntities() {
        return this.tree.current.state.keyEntities;
    }

    _getNode(key) {
        const keyEntities = this._getKeyEntities();
        let node = {};
        if (keyEntities[key]) {
            node = keyEntities[key].node;
        }

        return node;
    }

    _getIndexOfKey(key) {
        const keyEntities = this._getKeyEntities();

        return Object.keys(keyEntities).indexOf(key)
    }

    _getNextKey(key) {
        const keyEntities = this._getKeyEntities();
        const currentNode = keyEntities[key];
        const indexOf = this._getIndexOfKey(key);
        let nextKey = Object.keys(keyEntities)[indexOf + 1];
        let isExpanded = this._isKeyExpanded(key);

        if (!currentNode.parent && !isExpanded) {
            Object.keys(keyEntities).forEach(index => {
                let node = keyEntities[index];
                if (!node.parent && node.key !== key) {
                    nextKey = node.key;
                }
            });

            if (this._getIndexOfKey(nextKey) === 0) {
                nextKey = undefined;
            }
        } else if (currentNode.children && !isExpanded) {
            let countChild = this._countChild(key, currentNode.children.length);
            let nextIndex = indexOf + countChild + 1;
            nextKey = Object.keys(keyEntities)[nextIndex];
        }

        return nextKey;
    }

    _getPrevKey(key) {
        const keyEntities = this._getKeyEntities();
        const indexOf = this._getIndexOfKey(key);
        let prevKey = Object.keys(keyEntities)[indexOf - 1];
        prevKey = this._getRecursivePrevKey(prevKey);

        return prevKey;
    }

    _isKeyExpanded(key) {
        return this.props.expandedKeys.find(row => row === key) ? true : false;
    }

    _getRecursivePrevKey(key) {
        const keyEntities = this._getKeyEntities();
        const node = keyEntities[key];
        let newKey = key;

        if (node.parent) {
            let parentNode = node.parent;
            let isExpanded = this._isKeyExpanded(parentNode.key);
            if (!isExpanded) {
                newKey = this._getRecursivePrevKey(parentNode.key);
            }
        }

        return newKey;
    }

    _countChild(key, count) {
        const keyEntities = this._getKeyEntities();
        const currentNode = keyEntities[key];
        if (currentNode.children) {
            currentNode.children.forEach(child => {
                if (child.children) {
                    count += child.children.length;
                    count = this._countChild(child.key, count);
                }
            })
        }

        return count;
    }

    _nextNode() {
        const { selectedKeys, onSelect } = this.props;
        if (selectedKeys) {
            const currentKey = selectedKeys[0];
            if (currentKey) {
                const nextKey = this._getNextKey(currentKey);
                if (nextKey) {
                    const node = this._getNode(nextKey);
                    onSelect([nextKey], {node});
                }
            }  
        }
        
    }

    _prevNode() {
        const { selectedKeys, onSelect } = this.props;
        if (selectedKeys) {
            const currentKey = selectedKeys[0];
            if (currentKey) {
                const prevKey = this._getPrevKey(currentKey);
                if (prevKey) {
                    const node = this._getNode(prevKey);
                    onSelect([prevKey], { node });
                }
            }
        }
        
    }

    _expandNode() {
        const { selectedKeys, expandedKeys, onExpand } = this.props;
        const currentKey = selectedKeys[0];
        const keys = this._getKeyEntities();
        let currentNode = keys[currentKey];

        if (currentNode.children) {
            let isExist = expandedKeys.find(row => row === currentKey);
            if (!isExist) {
                onExpand([...expandedKeys, currentKey]);
            }
        }
    }

    _collapseNode() {
        let { selectedKeys, expandedKeys, onExpand } = this.props;
        const currentKey = selectedKeys[0];
        const keys = this._getKeyEntities();
        let currentNode = keys[currentKey];

        if (currentNode.children) {
            let isExist = expandedKeys.find(row => row === currentKey);
            if (isExist) {
                let indexExpanded = expandedKeys.indexOf(currentKey);
                if (indexExpanded > -1) {
                    expandedKeys.splice(indexExpanded, 1);
                }
                onExpand([...expandedKeys]);
            }

        }
    }

    _checkNode(e) {
        const { selectedKeys, checkedKeys } = this.props;
        if (selectedKeys) {
            const currentKey = selectedKeys[0];
            if (currentKey && checkedKeys) {
                let isExist = checkedKeys.find(row => row === currentKey);
                let checked = !isExist ? true : false;
                let treeNode = { props: { selected: true, eventKey: currentKey } };

                this.tree.current.onNodeCheck(e, treeNode, checked);
            }
            
        }
        
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this._navigation, false);
    }
}

TreeView.propTypes = {
    navigation: PropTypes.bool,
    onCheck: PropTypes.func,
    onSelect: PropTypes.func,
    onExpand: PropTypes.func,
    selectedKeys: PropTypes.array,
    checkedKeys: PropTypes.array,
    expandedKeys: PropTypes.array,
}

TreeView.defaultProps = {
    navigation: true
}

export default TreeView;
