//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Storage
{
  mapping(address => File[]) private _ownerFiles;

  constructor()
  {}

  struct File {
    string name;
    string description;
    uint256 size;
    string mimeType;
    string hash;
    uint256 uploadTime;
  }

  event FileStored(
    string name,
    string description,
    uint256 size,
    string mimeType,
    string hash,
    uint256 uploadTime
  );

  function storeFile(
    string memory _name,
    string memory _description,
    uint256 _size,
    string memory _mimeType,
    string memory _hash
  )
    public
  {
    File memory newFile = File(
      _name,
      _description,
      _size,
      _mimeType,
      _hash,
      block.timestamp
    );

    _ownerFiles[msg.sender].push(newFile);

    emit FileStored(
      _name,
      _description,
      _size,
      _mimeType,
      _hash,
      block.timestamp
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
      uint256 size,
      string memory mimeType,
      string memory hash,
      uint256 uploadTime
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
      file.uploadTime
    );
  }
}
