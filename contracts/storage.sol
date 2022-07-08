// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

/**
 * @title Storage
 * @dev Storage contract for managing files' metadata.
 * @author Abd El-Twab M. Fakhry
 */

contract Storage {
    mapping(address => File[]) private _ownerToFiles;
    mapping(address => mapping(string => uint256)) private _hashToIndex;

    struct File {
        uint256 index;
        string name;
        uint256 size;
        string mimeType;
        string hash;
        uint256 uploadTime;
    }

    event FileStored(
        uint256 index,
        string name,
        uint256 size,
        string mimeType,
        string hash,
        uint256 uploadTime
    );

    event FileShared(
        address to,
        uint256 index,
        string name,
        uint256 size,
        string mimeType,
        string hash,
        uint256 uploadTime
    );

    event FileRemoved(
        uint256 index,
        string name,
        uint256 size,
        string mimeType,
        string hash,
        uint256 uploadTime
    );

    function storeFile(
        string memory _name,
        uint256 _size,
        string memory _mimeType,
        string memory _hash
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(
            bytes(_name).length <= 512,
            "Name cannot be longer than 512 bytes"
        );

        require(_size > 0, "Size must be greater than 0");
        require(_size <= 2**30, "Size must be less than 2**30");

        require(bytes(_mimeType).length > 0, "Mime type cannot be empty");
        require(
            bytes(_mimeType).length <= 512,
            "Mime type cannot be longer than 512 bytes"
        );

        require(bytes(_hash).length > 0, "Hash cannot be empty");

        File memory newFile = File(
            _ownerToFiles[msg.sender].length,
            _name,
            _size,
            _mimeType,
            _hash,
            block.timestamp
        );

        // check if the file's hash is already present in the hashes array
        if (_hashToIndex[msg.sender][_hash] == 0) {
            _ownerToFiles[msg.sender].push(newFile);
            _hashToIndex[msg.sender][_hash] = _ownerToFiles[msg.sender].length;

            emit FileStored(
                newFile.index,
                newFile.name,
                newFile.size,
                newFile.mimeType,
                newFile.hash,
                newFile.uploadTime
            );
        }
    }

    function getFilesCount() public view returns (uint256) {
        return _ownerToFiles[msg.sender].length;
    }

    function getSingleFile(uint256 _index) public view returns (File memory) {
        require(
            _index < _ownerToFiles[msg.sender].length,
            "Index out of bounds"
        );
        return _ownerToFiles[msg.sender][_index];
    }

    function getAllFiles() public view returns (File[] memory) {
        require(_ownerToFiles[msg.sender].length > 0, "No files found!");
        return _ownerToFiles[msg.sender];
    }

    function min(uint256 first, uint256 last) private pure returns (uint256) {
        if (first < last) {
            return first;
        } else {
            return last;
        }
    }

    function getRangeOfFiles(uint256 _startIndex, uint256 _endIndex)
        public
        view
        returns (File[] memory)
    {
        require(_ownerToFiles[msg.sender].length > 0, "No files found!");
        require(
            _startIndex < _ownerToFiles[msg.sender].length,
            "Index out of bounds"
        );
        require(
            _endIndex > _startIndex,
            "start index must be strictly smaller than the end index"
        );

        _endIndex = min(_endIndex, _ownerToFiles[msg.sender].length);
        uint256 range = _endIndex - _startIndex;
        File[] memory result = new File[](range);
        for (uint256 i = _startIndex; i < _endIndex; ++i) {
            result[i - _startIndex] = _ownerToFiles[msg.sender][i];
        }
        return result;
    }

    function shareFile(address _to, uint256 _index) public {
        require(
            _index < _ownerToFiles[msg.sender].length,
            "Index out of bounds!"
        );
        require(_to != msg.sender, "To yourself!");
        require(_to != address(0), "Null address!");

        File memory file = _ownerToFiles[msg.sender][_index];

        // check if the file's hash is already present in the hashes array of the receiver
        if (_hashToIndex[_to][file.hash] == 0) {
            _ownerToFiles[_to].push(file);
            _hashToIndex[_to][file.hash] = _ownerToFiles[_to].length;

            emit FileShared(
                _to,
                file.index,
                file.name,
                file.size,
                file.mimeType,
                file.hash,
                file.uploadTime
            );
        }
    }

    function removeFile(uint256 _index) public {
        require(
            _index < _ownerToFiles[msg.sender].length,
            "Index out of bounds!"
        );

        File memory file = _ownerToFiles[msg.sender][_index];

        _ownerToFiles[msg.sender][_index] = _ownerToFiles[msg.sender][
            _ownerToFiles[msg.sender].length - 1
        ];
        _ownerToFiles[msg.sender][_index].index = _index;
        _ownerToFiles[msg.sender].pop();

        _hashToIndex[msg.sender][
            _ownerToFiles[msg.sender][_index].hash
        ] = _hashToIndex[msg.sender][file.hash];
        _hashToIndex[msg.sender][file.hash] = 0;

        emit FileRemoved(
            file.index,
            file.name,
            file.size,
            file.mimeType,
            file.hash,
            file.uploadTime
        );
    }
}
