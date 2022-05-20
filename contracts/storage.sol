//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Storage
{

  mapping(address => File[]) private _ownerFiles;

  constructor()
  {}

  struct File {
    string name;
    string description;
    uint size;
    string mimeType;
    string hash;
    uint uploadTime;
    string key;
  }

  event FileStored(
    string name,
    string description,
    uint size,
    string mimeType,
    string hash,
    uint uploadTime,
    string key
  );

  function storeFile(
    string memory _name,
    string memory _description,
    uint _size,
    string memory _mimeType,
    string memory _hash,
    string memory _key
  )
    public
  {
    require(bytes(_name).length > 0, "File name cannot be empty!");
    require(_size > 0, "File size cannot be zero!");
    require(bytes(_mimeType).length > 0, "File mime type cannot be empty!");
    require(bytes(_hash).length > 0, "File hash cannot be empty!");
    require(bytes(_key).length > 0, "File key cannot be empty!");

    File memory newFile = File(
      _name,
      _description,
      _size,
      _mimeType,
      _hash,
      block.timestamp,
      _key
    );

    _ownerFiles[msg.sender].push(newFile);

    emit FileStored(
      _name,
      _description,
      _size,
      _mimeType,
      _hash,
      block.timestamp,
      _key
    );
  }

  function getOwnerFilesCount()
    public
    view
    returns (uint)
  {
    return _ownerFiles[msg.sender].length;
  }

  function getOwnerFile(uint _index)
    public
    view
    returns(
      string memory name,
      string memory description,
      uint size,
      string memory mimeType,
      string memory hash,
      uint uploadTime,
      string memory key
    )
  {
    // Zero-indexed
    require(_index < _ownerFiles[msg.sender].length, "Index out of bounds!");

    File memory file = _ownerFiles[msg.sender][_index];

    return (
      file.name,
      file.description,
      file.size,
      file.mimeType,
      file.hash,
      file.uploadTime,
      file.key
    );
  }
}
