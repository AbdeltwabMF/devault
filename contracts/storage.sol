//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
  * @title Storage
  * @dev Storage contract for managing files' metadata.
  * @author Abd El-Twab M. Fakhry
  */

contract Storage
{
  /**
    * @dev Map the owner address to array of files
    */
  mapping(address => File[]) private _ownerToFiles;

  struct File {
    string name;
    uint256 size;
    string mimeType;
    string hash;
    uint256 uploadTime;
  }

  event FileStored(
    string name,
    uint256 size,
    string mimeType,
    string hash,
    uint256 uploadTime
  );

  event FileShared(
    address to,
    string name,
    uint256 size,
    string mimeType,
    string hash,
    uint256 uploadTime
  );

  event FileRemoved(
    string name,
    uint256 size,
    string mimeType,
    string hash,
    uint256 uploadTime
  );

  /**
    * @dev Store a file
    * @param _name Name of the file
    * @param _size Size of the file
    * @param _mimeType Mime type of the file
    * @param _hash Hash of the file
    */
  function storeFile(
    string memory _name,
    uint256 _size,
    string memory _mimeType,
    string memory _hash
  )
    public
    returns (bool)
  {
    require(bytes(_name).length > 0, "Name cannot be empty");
    require(_size > 0, "Size must be greater than 0");
    require(bytes(_mimeType).length > 0, "Mime type cannot be empty");
    require(bytes(_hash).length > 0, "Hash cannot be empty");
    require(msg.sender != address(0), "Sender cannot be 0x0");

    File memory newFile = File(
      _name,
      _size,
      _mimeType,
      _hash,
      block.timestamp
    );

    _ownerToFiles[msg.sender].push(newFile);

    emit FileStored(
      _name,
      _size,
      _mimeType,
      _hash,
      block.timestamp
    );

    return true;
  }

  /**
    * @dev Get the files count of the owner
    */
  function getFilesLength()
    public
    view
    returns (uint)
  {
    return _ownerToFiles[msg.sender].length;
  }

  /**
    * @dev Get only one file
    * @param _index Index of the file
    */
  function getFile(uint _index)
    public
    view
    returns(File memory)
  {
    // Zero-indexed
    require(_index < _ownerToFiles[msg.sender].length, "Index out of bounds!");
    require(_ownerToFiles[msg.sender].length > 0, "No files found!");
    return _ownerToFiles[msg.sender][_index];
  }

  /**
    * @dev Get all files of the owner
    */
  function getFiles()
    public
    view
    returns(File[] memory)
  {
    require(_ownerToFiles[msg.sender].length > 0, "No files found!");
    return _ownerToFiles[msg.sender];
  }

  /**
    * @dev Share a file with another address
    * @param _index Index of the file
    * @param _to Address to share the file with
    */
  function shareFile(
    address _to,
    uint _index
  )
    public
    returns (bool)
  {
    require(_ownerToFiles[msg.sender].length > 0, "No files found!");
    require(_to != msg.sender, "To yourself!");
    require(_to != address(0), "Null address!");
    require(_index < _ownerToFiles[msg.sender].length, "Index out of bounds!");

    File memory file = _ownerToFiles[msg.sender][_index];

    _ownerToFiles[_to].push(file);

    emit FileShared(
      _to,
      file.name,
      file.size,
      file.mimeType,
      file.hash,
      block.timestamp
    );

    return true;
  }

  /**
    * @dev Remove a file
    * @param _index Index of the file
    */
  function removeFile(uint256 _index)
    public
    returns (bool)
  {
    require(_ownerToFiles[msg.sender].length > 0, "No files found!");
    require(_index < _ownerToFiles[msg.sender].length, "Index out of bounds!");

    File memory file = _ownerToFiles[msg.sender][_index];
    _ownerToFiles[msg.sender][_index] = _ownerToFiles[msg.sender][_ownerToFiles[msg.sender].length - 1];
    _ownerToFiles[msg.sender].pop();

    emit FileRemoved(
      file.name,
      file.size,
      file.mimeType,
      file.hash,
      block.timestamp
    );

    return true;
  }
}
