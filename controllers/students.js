const STUDENTS = [
    {
      id: 1,
      name: "Akash",
      city: "Amravati",
    },
    {
      id: 2,
      name: "Amit",
      city: "Pune",
    },
  ];
//------------------------------health API---------------------------------------//
const getHealth = (req, res) => {
    res.json({
      success: true,
      message: "Server is running",
    });
  };
//------------------------------Get API---------------------------------------//
  const getStudents = (req, res) => {
    res.status(200).json({
      success: true,
      data: STUDENTS,
      message: "Students fetched successfully",
    });
  };
//------------------------------Post API---------------------------------------//
  const postStudents = (req, res) => {
    const { name, city, id } = req.body;
  
    for (const student of STUDENTS) {
      if (id === student.id) {
        return res.status(400).json({
          success: false,
          message: "Student with this id already exists",
        });
      }
    }
  
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
  
    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }
  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }
  
    const studentObj = {
      id,
      name,
      city,
    };
  
    STUDENTS.push(studentObj);
  
    res.status(201).json({
      success: true,
      data: studentObj,
      message: "Student created successfully",
    });
  };
//------------------------------Delete API---------------------------------------//
const deleteStudentsById = (req, res) => {
    const { id } = req.params;
  
    let studentIndex = -1;
  
    STUDENTS.forEach((stud, i) => {
      if (stud.id == id) {
        studentIndex = i;
      }
    });
  
    if (studentIndex == -1) {
      return res.status(404).json({
        success: false,
        message: `Student with id:${id} does not exist`,
      });
    } else {
      STUDENTS.splice(studentIndex, 1);
      return res.status(200).json({
        success: true,
        message: `Student with id:${id} deleted successfully`,
      });
    }
  };
//------------------------------Put API---------------------------------------//
  const putStudentsById = (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
  
    if (!name) {
      return res.json({
        success: false,
        message: "Name is required",
      });
    }
  
    if (!city) {
      return res.json({
        success: false,
        message: "City is required",
      });
    }
  
    let studentIndex = -1;
  
    STUDENTS.forEach((stud, i) => {
      if (stud.id == id) {
        studentIndex = i;
      }
    });
  
    if (studentIndex == -1) {
      return res.json({
        success: false,
        message: `Student with id:${id} does not exist`,
      });
    }
  
    STUDENTS[studentIndex] = {
      id: parseInt(id),
      name: name,
      city: city,
    };
  
    res.json({
      success: true,
      data: STUDENTS[studentIndex],
      message: `Student with id:${id} updated successfully`,
    });
  };
//------------------------------Patch API---------------------------------------//
const patchStudentsCityById = (req, res) => {
    const { id } = req.params;
    const { city } = req.body;
  
    if (!city) {
      return res.json({
        success: false,
        message: "City is required",
      });
    }
  
    let studentIndex = -1;
  
    STUDENTS.forEach((stud, i) => {
      if (stud.id == id) {
        studentIndex = i;
      }
    });
  
    if (studentIndex == -1) {
      return res.json({
        success: false,
        message: `Student with id:${id} does not exist`,
      });
    }
  
    const existingStudent = STUDENTS[studentIndex];
  
    const updatedStudent = {
      ...existingStudent,
      city,
    };
  
    STUDENTS[studentIndex] = updatedStudent;
  
    res.json({
      success: true,
      data: updatedStudent,
      message: `Student with id:${id} updated successfully`,
    });
  };
  const getStudentsSearch = (req, res) => {
    const { name } = req.query;
    const { authorization } = req.headers;
  
    if (authorization != "token123") {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
  
    res.json({
      success: true,
      message: `You are searching for ${name}`,
    });
  };

  export {
    deleteStudentsById,
    getHealth,
    getStudents,
    patchStudentsCityById,
    postStudents,
    putStudentsById,
    getStudentsById,
    getStudentsSearch,   
  };