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
  mapping(string => uint) private _hashToIndex;

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
    require(bytes(_name).length <= 512, "Name cannot be longer than 512 bytes");

    require(_size > 0, "Size must be greater than 0");
    require(_size <= 2**30, "Size must be less than 2**30");

    require(bytes(_mimeType).length > 0, "Mime type cannot be empty");
    require(bytes(_mimeType).length <= 128, "Mime type cannot be longer than 128 bytes");

    require(bytes(_hash).length > 0, "Hash cannot be empty");

    File memory newFile = File(
      _name,
      _size,
      _mimeType,
      _hash,
      block.timestamp
    );

    if(_hashToIndex[_hash] == 0) {
      _hashToIndex[_hash] = _ownerToFiles[msg.sender].length + 1;
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
    return false;
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
    require(_index < _ownerToFiles[msg.sender].length, "Index out of bounds");
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
    require(_index < _ownerToFiles[msg.sender].length, "Index out of bounds!");
    require(_to != msg.sender, "To yourself!");
    require(_to != address(0), "Null address!");

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
