/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAssignment = /* GraphQL */ `
  mutation CreateAssignment(
    $input: CreateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    createAssignment(input: $input, condition: $condition) {
      id
      courseId
      ownerId
      title
      summary
      image
      isLinkedToLms
      lineItemId
      lockOnDate
      isLockedOnSubmission
      isUseAutoScore
      isUseAutoSubmit
      isArchived
      isFavorite
      toolAssignmentData {
        plannerData {
          id
          title
          content {
            description
            paneSize
            sections {
              id
              ownerId
              title
              description
              type
              text
              items {
                id
                label
                done
              }
            }
          }
          ownerId
        }
        plannerConfig {
          studentAccessLevel
          dueDate
          minWordsCount
          minChecklistItems
          maxScore
        }
      }
      allowResubmission
      createdAt
      updatedAt
    }
  }
`;
export const updateAssignment = /* GraphQL */ `
  mutation UpdateAssignment(
    $input: UpdateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    updateAssignment(input: $input, condition: $condition) {
      id
      courseId
      ownerId
      title
      summary
      image
      isLinkedToLms
      lineItemId
      lockOnDate
      isLockedOnSubmission
      isUseAutoScore
      isUseAutoSubmit
      isArchived
      isFavorite
      toolAssignmentData {
        plannerData {
          id
          title
          content {
            description
            paneSize
            sections {
              id
              ownerId
              title
              description
              type
              text
              items {
                id
                label
                done
              }
            }
          }
          ownerId
        }
        plannerConfig {
          studentAccessLevel
          dueDate
          minWordsCount
          minChecklistItems
          maxScore
        }
      }
      allowResubmission
      createdAt
      updatedAt
    }
  }
`;
export const deleteAssignment = /* GraphQL */ `
  mutation DeleteAssignment(
    $input: DeleteAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    deleteAssignment(input: $input, condition: $condition) {
      id
      courseId
      ownerId
      title
      summary
      image
      isLinkedToLms
      lineItemId
      lockOnDate
      isLockedOnSubmission
      isUseAutoScore
      isUseAutoSubmit
      isArchived
      isFavorite
      toolAssignmentData {
        plannerData {
          id
          title
          content {
            description
            paneSize
            sections {
              id
              ownerId
              title
              description
              type
              text
              items {
                id
                label
                done
              }
            }
          }
          ownerId
        }
        plannerConfig {
          studentAccessLevel
          dueDate
          minWordsCount
          minChecklistItems
          maxScore
        }
      }
      allowResubmission
      createdAt
      updatedAt
    }
  }
`;
export const createHomework = /* GraphQL */ `
  mutation CreateHomework(
    $input: CreateHomeworkInput!
    $condition: ModelHomeworkConditionInput
  ) {
    createHomework(input: $input, condition: $condition) {
      id
      assignmentId
      studentOwnerId
      beganOnDate
      submittedOnDate
      isLocked
      toolHomeworkData {
        plannerData {
          id
          title
          content {
            description
            paneSize
            sections {
              id
              ownerId
              title
              description
              type
              text
              items {
                id
                label
                done
              }
            }
          }
          ownerId
        }
        files {
          sectionId
          fileName
          fileKey
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateHomework = /* GraphQL */ `
  mutation UpdateHomework(
    $input: UpdateHomeworkInput!
    $condition: ModelHomeworkConditionInput
  ) {
    updateHomework(input: $input, condition: $condition) {
      id
      assignmentId
      studentOwnerId
      beganOnDate
      submittedOnDate
      isLocked
      toolHomeworkData {
        plannerData {
          id
          title
          content {
            description
            paneSize
            sections {
              id
              ownerId
              title
              description
              type
              text
              items {
                id
                label
                done
              }
            }
          }
          ownerId
        }
        files {
          sectionId
          fileName
          fileKey
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteHomework = /* GraphQL */ `
  mutation DeleteHomework(
    $input: DeleteHomeworkInput!
    $condition: ModelHomeworkConditionInput
  ) {
    deleteHomework(input: $input, condition: $condition) {
      id
      assignmentId
      studentOwnerId
      beganOnDate
      submittedOnDate
      isLocked
      toolHomeworkData {
        plannerData {
          id
          title
          ownerId
        }
        files {
          sectionId
          fileName
          fileKey
        }
      }
      createdAt
      updatedAt
    }
  }
`;
