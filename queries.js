/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const bringOpportunity = /* GraphQL */ `
  query BringOpportunity($id: ID!) {
    bringOpportunity(id: $id) {
      id
      title
      location
      date
      description
      capacity
      status
      cover {
        bucket
        region
        key
      }
      applicationRequired
      applicationDeadline
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        nextToken
      }
      organiser {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      opportunityOpportunityProviderId
      attendees {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const getOpportunityProvider = /* GraphQL */ `
  query GetOpportunityProvider($id: ID!) {
    getOpportunityProvider(id: $id) {
      id
      name
      displayName
      companyNo
      parent
      email
      educationalInstitution
      status
      logo {
        bucket
        region
        key
      }
      tagline
      address
      phone
      website
      primarySector {
        id
        name
        status
        createdAt
        updatedAt
      }
      otherSectors {
        nextToken
      }
      followers {
        nextToken
      }
      contents {
        nextToken
      }
      opportunities {
        nextToken
      }
      opportunityTypes {
        nextToken
      }
      users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviders = /* GraphQL */ `
  query ListOpportunityProviders(
    $filter: ModelOpportunityProviderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderFollower = /* GraphQL */ `
  query GetOpportunityProviderFollower($id: ID!) {
    getOpportunityProviderFollower(id: $id) {
      id
      status
      startedAt
      opportunityProviderId
      seekerId
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      seeker {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        interests
        admireBrands
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviderFollowers = /* GraphQL */ `
  query ListOpportunityProviderFollowers(
    $filter: ModelOpportunityProviderFollowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviderFollowers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        startedAt
        opportunityProviderId
        seekerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderSector = /* GraphQL */ `
  query GetOpportunityProviderSector($id: ID!) {
    getOpportunityProviderSector(id: $id) {
      id
      name
      status
      opportunityProviders {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviderSectors = /* GraphQL */ `
  query ListOpportunityProviderSectors(
    $filter: ModelOpportunityProviderSectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviderSectors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderUser = /* GraphQL */ `
  query GetOpportunityProviderUser($id: ID!) {
    getOpportunityProviderUser(id: $id) {
      id
      firstName
      lastName
      email
      status
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      opportunityProviderUserOpportunityProviderId
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviderUsers = /* GraphQL */ `
  query ListOpportunityProviderUsers(
    $filter: ModelOpportunityProviderUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviderUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunity = /* GraphQL */ `
  query GetOpportunity($id: ID!) {
    getOpportunity(id: $id) {
      id
      title
      location
      date
      description
      capacity
      status
      cover {
        bucket
        region
        key
      }
      applicationRequired
      applicationDeadline
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        nextToken
      }
      organiser {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      opportunityOpportunityProviderId
      attendees {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunitys = /* GraphQL */ `
  query ListOpportunitys(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        location
        date
        description
        capacity
        status
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityType = /* GraphQL */ `
  query GetOpportunityType($id: ID!) {
    getOpportunityType(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityTypes = /* GraphQL */ `
  query ListOpportunityTypes(
    $filter: ModelOpportunityTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityStep = /* GraphQL */ `
  query GetOpportunityStep($id: ID!) {
    getOpportunityStep(id: $id) {
      id
      opportunity {
        id
        title
        location
        date
        description
        capacity
        status
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityStepOpportunityId
      seeker {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        interests
        admireBrands
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunitySteps = /* GraphQL */ `
  query ListOpportunitySteps(
    $filter: ModelOpportunityStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunitySteps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        opportunityStepOpportunityId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeeker = /* GraphQL */ `
  query GetSeeker($id: ID!) {
    getSeeker(id: $id) {
      id
      username
      firstName
      lastName
      email
      status
      mobileNumber
      postcodeArea
      dateOfBirth
      biography
      profilePic {
        bucket
        region
        key
      }
      routeMaps {
        nextToken
      }
      opportunityProviders {
        nextToken
      }
      opportunities {
        nextToken
      }
      posts {
        nextToken
      }
      interests
      admireBrands
      createdAt
      updatedAt
    }
  }
`;
export const listSeekers = /* GraphQL */ `
  query ListSeekers(
    $filter: ModelSeekerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeekers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        interests
        admireBrands
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteMap = /* GraphQL */ `
  query GetRouteMap($id: ID!) {
    getRouteMap(id: $id) {
      id
      visibility
      status
      coverPhoto {
        bucket
        region
        key
      }
      destination
      category {
        id
        name
        iconName
        bgColor
        status
        createdAt
        updatedAt
      }
      owner {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        interests
        admireBrands
        createdAt
        updatedAt
      }
      focusAreas {
        nextToken
      }
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMaps = /* GraphQL */ `
  query ListRouteMaps(
    $filter: ModelRouteMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        visibility
        status
        destination
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFocusArea = /* GraphQL */ `
  query GetFocusArea($id: ID!) {
    getFocusArea(id: $id) {
      id
      name
      status
      routeMaps {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFocusAreas = /* GraphQL */ `
  query ListFocusAreas(
    $filter: ModelFocusAreaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFocusAreas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteMapCategory = /* GraphQL */ `
  query GetRouteMapCategory($id: ID!) {
    getRouteMapCategory(id: $id) {
      id
      name
      iconName
      bgColor
      status
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMapCategorys = /* GraphQL */ `
  query ListRouteMapCategorys(
    $filter: ModelRouteMapCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMapCategorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        iconName
        bgColor
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteMapDestination = /* GraphQL */ `
  query GetRouteMapDestination($id: ID!) {
    getRouteMapDestination(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMapDestinations = /* GraphQL */ `
  query ListRouteMapDestinations(
    $filter: ModelRouteMapDestinationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMapDestinations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      type
      caption
      status
      visibility
      blog {
        blogTitle
        blogDescription
        visibility
      }
      photo {
        bucket
        region
        key
      }
      video {
        bucket
        region
        key
      }
      routeMap {
        id
        visibility
        status
        destination
        createdAt
        updatedAt
      }
      opportunity {
        id
        title
        location
        date
        description
        capacity
        status
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      tags {
        id
        tag
        link
        createdAt
        updatedAt
      }
      seeker {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        interests
        admireBrands
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        caption
        status
        visibility
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostTag = /* GraphQL */ `
  query GetPostTag($id: ID!) {
    getPostTag(id: $id) {
      id
      tag
      link
      posts {
        id
        type
        caption
        status
        visibility
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostTags = /* GraphQL */ `
  query ListPostTags(
    $filter: ModelPostTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tag
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpsNotInApp = /* GraphQL */ `
  query GetOpsNotInApp($id: ID!) {
    getOpsNotInApp(id: $id) {
      id
      name
      interested
      status
      createdAt
      updatedAt
    }
  }
`;
export const listOpsNotInApps = /* GraphQL */ `
  query ListOpsNotInApps(
    $filter: ModelOpsNotInAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpsNotInApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        interested
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      dateTime
      from
      details
      typeId
      type
      about
      status
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateTime
        from
        details
        typeId
        type
        about
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSpecialProject = /* GraphQL */ `
  query GetSpecialProject($id: ID!) {
    getSpecialProject(id: $id) {
      id
      opportunityProviderId
      opportunityProviderUserId
      contactName
      email
      telephoneNumber
      mobileNumber
      employeeCount
      projectSummary
      status
      primarySectorId
      primarySector {
        id
        name
        status
        createdAt
        updatedAt
      }
      createdBy {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSpecialProjects = /* GraphQL */ `
  query ListSpecialProjects(
    $filter: ModelSpecialProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        opportunityProviderId
        opportunityProviderUserId
        contactName
        email
        telephoneNumber
        mobileNumber
        employeeCount
        projectSummary
        status
        primarySectorId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      title
      description
      type
      positiveFeedbacks {
        nextToken
      }
      blog {
        blogTitle
        blogDescription
        visibility
      }
      photo {
        bucket
        region
        key
      }
      video
      status
      opportunityProviderId
      opportunityProviderUserId
      createdBy {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        tagline
        address
        phone
        website
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        type
        video
        status
        opportunityProviderId
        opportunityProviderUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
